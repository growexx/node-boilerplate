
const SignUpService = require('./signUpService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for signup.
 */
class SignUpController {
    /**
     * @desc This function is being used to signUp user
     * @author Growexx
     * @since 27/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {String} req.body.password password
     * @param {Object} res Response
     */
    static async signUp (req, res) {
        try {
            req.body.userType = CONSTANTS.ROLE.USER;
            const data = await SignUpService.signUp(req);
            Utils.sendResponse(null, data, res, MESSAGES.REGISTER_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to verify user account
     * @author Growexx
     * @since 27/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {Object} req.body.token token
     * @param {Object} res Response
     */
    static async verifyAccount (req, res) {
        try {
            const data = await SignUpService.verifyAccount(req);
            Utils.sendResponse(null, data, res, MESSAGES.USER_VERIFY_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to verify user mobile
     * @author Growexx
     * @since 21/09/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.mobile mobile
     * @param {Object} req.body.otp otp
     * @param {Object} res Response
     */
    static async verifyMobile (req, res) {
        try {
            const data = await SignUpService.verifyMobile(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.USER_MOBILE_VERIFY_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to resendOTP to user user
     * @author Growexx
     * @since 27/03/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.email email
     * @param {Object} res Response
     */
    static async resendOTP (req, res) {
        try {
            const data = await SignUpService.resentOTP(req);
            Utils.sendResponse(null, data, res, MESSAGES.RESEND_OTP_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to resendOTP to user
     * @author Growexx
     * @since 21/09/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {String} req.body.mobile mobile
     * @param {Object} res Response
     */
    static async resendMobileOTP (req, res) {
        try {
            const data = await SignUpService.resentMobileOTP(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.RESEND_OTP_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = SignUpController;
