const crypt = require('../../util/crypt');
const SignUpValidator = require('./signUpValidator');
const UtilFunctions = require('../../util/utilFunctions');
const Email = require('../../util/sendEmail');
const User = require('../../models/user.model');

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

    /**
     * @desc This function is being used to add user from social account signup
     * @author Growexx
     * @since 05/04/2023
     * @param {Object} req Request
     */
    static async socialSignUp (req) {
        const { id, email, firstName, lastName, picture, token, platform } = req.body;
        let user = await User.findOne( {
            email
        });
        if (user) {
            await User.updateOne({
                email
            },
            {
                socialId: id,
                socialToken: token,
                socialPlatform: platform
            });
            user = await User.findOne({
                email
            });
        } else {
            user = await User.create({
                email,
                firstName,
                lastName,
                isActive: CONSTANTS.STATUS.ACTIVE,
                role: CONSTANTS.ROLE.USER,
                profilePicture: picture,
                socialId: id,
                socialToken: token,
                socialPlatform: platform
            });
        }
        const loginToken = await crypt.getUserAccessToken(user);
        delete user.password;
        delete user.__v;
        _.merge(user, loginToken, {});
        return user;
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
            const token = await crypt.getUserAccessToken(user);
            const refreshToken = await crypt.getUserRefreshToken(user);
            user.password = null;
            _.merge(user, token, otherDetails);
            _.merge(user, { refreshToken: refreshToken.token } );
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
            const token = await crypt.getUserAccessToken(user);
            const refreshToken = await crypt.getUserRefreshToken(user);
            return { token: token.token, refreshToken: refreshToken.token };
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
}

module.exports = SignUpService;
