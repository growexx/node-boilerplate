const crypt = require('../../util/crypt');
const SignUpValidator = require('./signUpValidator');
const UtilFunctions = require('../../util/utilFunctions');
const Email = require('../../util/sendEmail');
const User = require('../../models/user.model');
const UserVerification = require('../../models/userVerification.model');
const SMS = require('../../util/sendSMS');
const { v4: uuidv4 } = require('uuid');
const Speakeasy = require('speakeasy');

/**
 * Class represents services for Sign-up.
 */
class SignUpService {

    /**
     * @desc This function is being used to signUp user user
     * @author Growexx
     * @since 27/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {String} req.body.password password
     */
    static async signUp (req, locale) {
        const Validator = new SignUpValidator(req.body, locale);
        Validator.validate();

        req.body.email = req.body.email.toLowerCase();
        const user = await SignUpService.isUserAlreadyRegister(req.body);

        if (!user) {
            const hash = await crypt.enCryptPassword(req.body.password);
            const otp = UtilFunctions.generateOtp();
            const userType = req.body.userType;
            await SignUpService.saveOrUpdateRegistrationUser(req.body, hash, otp, userType);
            const subject = 'Lets invent the future of work';
            const template = 'emailTemplates/verificationOtpMail.html';
            const appUrl = process.env.FRONTEND_URL;
            const templateVariables = { appUrl, otp };
            await Email.prepareAndSendEmail([req.body.email], subject, template, templateVariables);
            return { email: req.body.email, role: userType };
        } else if (!user.isActive) {
            throw {
                message: MESSAGES.INACTIVE_USER,
                statusCode: 400
            };
        } else {
            return await SignUpService.checkLogin(req.body.password, user);
        }
    }

    static async checkLogin (password, user) {
        const isMatch = await crypt.comparePassword(password, user.password);
        const otherDetails = {};
        if (!isMatch) {
            throw {
                message: MESSAGES.ALREADY_REGISTER,
                statusCode: 422
            };
        } else {
            const token = await crypt.getUserToken(user);
            delete user.password;
            delete user.__v;
            _.merge(user, token, otherDetails);
        }

        return user;
    }

    /**
     * @desc This function is being used to check email already exists for sign-up of user
     * @author Growexx
     * @since 27/03/2021
     * @param {Object} reqObj reqObj
     */
    static async isUserAlreadyRegister (reqObj) {
        const where = { email: reqObj.email };
        return await User.findOne(where).lean();
    }

    /**
     * @desc This function is being used to save or update user details
     * @author Growexx
     * @since 27/03/2021
     * @param {Object} reqObj Request
     * @param {Object} reqObj.body RequestBody
     * @param {Object} reqObj reqObj
     * @param {String} hash password
     * @param {Object} otp otp
     * @param {Integer} userType 1 = user 2 = Client
     */
    static async saveOrUpdateRegistrationUser (reqObj, hash, otp, userType) {
        reqObj.password = hash;
        reqObj.isActive = CONSTANTS.STATUS.PENDING;
        reqObj.otp = otp;
        reqObj.role = userType;
        await User.create(reqObj);
    }


    /**
     * @desc This function is being used to verify user account
     * @author Growexx
     * @since 27/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.otp otp
     */
    static async verifyAccount (req) {
        const Validator = new SignUpValidator(req.body);
        Validator.otpValidate();
        req.body.email = req.body.email.toLowerCase();
        const user = await User.findOne({ email: req.body.email }).exec();
        if (user && user.otp === req.body.otp) {
            await User.updateOne({ _id: user._id }, {
                $set: {
                    isActive: CONSTANTS.STATUS.ACTIVE
                }
            });
            return crypt.getUserToken(user);
        } else {
            throw {
                message: MESSAGES.INVALID_OTP,
                statusCode: 400
            };
        }
    }

    /**
     * @desc This function is being used to resent OTP in case of email not received
     * @author Growexx
     * @since 27/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.email email
     * @param {Object} req.body.otp otp
     */
    static async resentOTP (req) {
        const Validator = new SignUpValidator(req.body);
        Validator.email(req.body.email);
        req.body.email = req.body.email.toLowerCase();
        const user = await User.findOne({ email: req.body.email }).exec();
        if (user) {
            const subject = 'Lets invent the future of work';
            const template = 'emailTemplates/verificationOtpMail.html';
            const appUrl = process.env.FRONTEND_URL;
            const templateVariables = { appUrl, otp: user.otp };
            await Email.prepareAndSendEmail([user.email], subject, template, templateVariables);
            return { email: req.body.email };
        } else {
            throw {
                message: MESSAGES.USER_NOT_FOUND,
                statusCode: 400
            };
        }
    }

    /**
     * @desc This function is being used to signUp user - MFA
     * @author Growexx
     * @since 22/06/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {String} req.body.phoneNumber phoneNumber
     * @param {String} req.body.password password
     */
    static async signUpMFA (req, locale) {
        const Validator = new SignUpValidator(req.body, locale);
        Validator.mfaValidate();

        req.body.email = req.body.email.toLowerCase();
        const user = await SignUpService.isUserAlreadyRegister(req.body);
        if (!user) {
            const hash = await crypt.enCryptPassword(req.body.password);
            const otp = UtilFunctions.generateOtp();
            const userType = req.body.userType;
            await SignUpService.saveOrUpdateRegistrationUser(req.body, hash, otp, userType);

            const userDetails = await User.findOne({ email: req.body.email }).exec();
            const id = userDetails._id;
            const uniqueString = uuidv4() + id;

            const token = await SignUpService.getTokenForSMS();
            const newVerification = new UserVerification({
                uniqueString,
                userid: id,
                otp: token,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000
            });
            await newVerification.save();

            const filePath = `${process.env.BASE_URL}/verify-mfa`;
            const subject = 'Verify Your Email';
            const template = `<p>Verify your email to complete the signup.</p><p>This link expires in 1 hour.</p>
                <p>Click <a href=${filePath + '/' + id + '/' + uniqueString}>here</a> to proceed.</p>`;

            await Email.sendVerificationEmail(
                [req.body.email],
                subject,
                template
            );
            await SignUpService.sendVerificationSMS(id, token);
            return {
                data: 'Email and SMS sent successfully.'
            };
        } else if (!user.isActive) {
            throw {
                message: MESSAGES.INACTIVE_USER,
                statusCode: 400
            };
        } else {
            return await SignUpService.checkLogin(req.body.password, user);
        }
    }

    /**
     * @desc This function is being used to get token for SMS
     * @author Growexx
     * @since 22/06/2022
     */
    static async getTokenForSMS () {
        const secret = Speakeasy.generateSecret({ length: 20 });
        return Speakeasy.totp({
            secret: secret.base32,
            encoding: 'base32',
            window: 1
        });
    }

    /**
     * @desc This function is being used to send SMS
     * @author Growexx
     * @since 22/06/2022
     * @param {String} userId, userId
     * @param {String} token token
     */
    static async sendVerificationSMS (userId, token) {
        const userDetails = await User.findOne({ _id: userId }).exec();
        return await SMS.sendSMS(userDetails.phoneNumber, `OTP : ${token}`);
    }

    /**
     * @desc This function is being used to verify user - MFA
     * @author Growexx
     * @since 22/06/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.userId userId
     * @param {String} req.body.uniqueString uniqueString
     * @param {String} req.body.otp otp
     */
    static async verifyMFA (req) {
        const { userId, uniqueString, otp } = req.body;
        const userVerificationDetails = await UserVerification.findOne({ userid: userId }).exec();
        if (!otp) {
            throw ({ data: MESSAGES.OTP_REQUIRED });
        }
        if (!userVerificationDetails) {
            throw ({ data: MESSAGES.ENTER_VALID_OTP });
        }
        if (userVerificationDetails.expiresAt < Date.now()) {
            await UserVerification.deleteOne( { userid: userId } );
            throw { message: MESSAGES.EMAIL_LINK_EXPIRED, status: 400 };
        } else if ((userVerificationDetails.otp === otp) && (userVerificationDetails.uniqueString === uniqueString)) {
            await User.updateOne({ _id: userId }, { isActive: CONSTANTS.STATUS.ACTIVE });
            await UserVerification.deleteOne({ userid: userId });
        } else {
            throw ({ data: MESSAGES.ENTER_VALID_OTP });
        }
    }
}

module.exports = SignUpService;
