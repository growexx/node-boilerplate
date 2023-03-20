const UserFeedbackService = require('./userFeedbackService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for user feedback.
 */
class UserFeedbackController {
    /**
     * @desc This function is being used to Add user feedback
     * @author Growexx
     * @since 16/03/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.title title
     * @param {Object} req.body.description description
     * @param {function} res Response
     */
    static async addUserFeedback (req, res) {
        try {
            const data = await UserFeedbackService.addUserFeedback(req.body, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('FEEDBACK_SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to Get user feedback
     * @author Growexx
     * @since 17/03/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.title title
     * @param {Object} req.body.description description
     * @param {function} res Response
     */
    static async getUserFeedback (req, res) {
        try {
            const data = await UserFeedbackService.getUserFeedback(req.params, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to list user feedback
     * @author Growexx
     * @since 17/03/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.title title
     * @param {Object} req.body.description description
     * @param {function} res Response
     */
    static async listUserFeedback (req, res) {
        try {
            const data = await UserFeedbackService.listUserFeedback(req, res.locals.user);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to Get user feedback
     * @author Growexx
     * @since 17/03/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async deleteUserFeedback (req, res) {
        try {
            const data = await UserFeedbackService.deleteUserFeedback(req.params, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to Get user feedback
     * @author Growexx
     * @since 17/03/2023
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async inActiveUserFeedback (req, res) {
        try {
            const data = await UserFeedbackService.inActiveUserFeedback(req.params, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = UserFeedbackController;
