const SignUpValidator = require('./signUpValidator');
const UtilFunctions = require('../../util/utilFunctions');
const Email = require('../../util/sendEmail');
const User = require('../../models/user.model');
const Cognito = require('../../util/cognito');

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
            const otp = UtilFunctions.generateOtp();
            const userType = req.body.userType;
            const newCognitoUser = await Cognito.addCognitoUser(req.body.email);
            await Cognito.setCognitoUserPassword(req.body.email, req.body.password);
            const cognitoUser = await Cognito.login({ email: req.body.email, password: req.body.password });
            await SignUpService.saveOrUpdateRegistrationUser(
                req.body,
                otp,
                userType,
                newCognitoUser.User.Username,
                cognitoUser.refreshToken.token,
                cognitoUser.accessToken.jwtToken

            );
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
            return await SignUpService.checkLogin(req.body.email, req.body.password, user);
        }
    }

    static async checkLogin (email, password, user) {
        const cognitoUser = await Cognito.login({ email, password });
        if (!cognitoUser) {
            throw {
                message: MESSAGES.ALREADY_REGISTER,
                statusCode: 422
            };
        } else {
            const token = cognitoUser.idToken.jwtToken;
            user.token = token;
            delete user.__v;
            delete user.refreshToken;
            await User.updateOne({ email }, {
                $set: {
                    accessToken: cognitoUser.accessToken.jwtToken,
                    refreshToken: cognitoUser.refreshToken.token
                }
            });
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
    static async saveOrUpdateRegistrationUser (reqObj, otp, userType, cognitoId, refreshToken, accessToken) {
        reqObj.isActive = CONSTANTS.STATUS.PENDING;
        reqObj.otp = otp;
        reqObj.role = userType;
        reqObj.cognitoId = cognitoId;
        reqObj.refreshToken = refreshToken;
        reqObj.accessToken = accessToken;
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
            const updatedToken = await Cognito.generateRefreshToken(user.refreshToken);
            await User.updateOne({ _id: user._id }, {
                $set: {
                    isActive: CONSTANTS.STATUS.ACTIVE
                }
            });

            return { 'token': updatedToken.AuthenticationResult.IdToken };
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
