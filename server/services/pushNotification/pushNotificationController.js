
const PushNotificationService = require('./pushNotificationService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for user Basic Profile.
 */
class PushNotificationController {

    /**
     * @desc This function is being used to individual push notification to android device
     * @author Growexx
     * @since 19/05/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async postIndividualPushNotificationForAndroid (req, res) {
        try {
            const data = await PushNotificationService.individualPushNotificationForAndroid(req, res.__);
            Utils.sendResponse(null, data, res, 'Push notification sent successfully.');
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to individual push notification to android device
     * @author Growexx
     * @since 19/05/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async postIndividualPushNotificationForWeb (req, res) {
        try {
            const data = await PushNotificationService.individualPushNotificationForWeb(req, res.__);
            Utils.sendResponse(null, data, res, 'Push notification sent successfully.');
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
    /**
     * @desc This function is being used to store notification in database to send later
     * @author Growexx
     * @since 25/05/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async postCreateNotification (req, res) {
        try {
            const data = await PushNotificationService.createNotification(req, res.__);
            Utils.sendResponse(null, data, res, res.__('CREATE_NOTIFICATION'));

        } catch (error) {

            Utils.sendResponse(error, null, res, error.message);
        }
    }
    /**
     * @desc This function is being used to update push notification token
     * @author Growexx
     * @since 19/05/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async updatePushNotificationToken (req, res) {
        try {
            const data = await PushNotificationService.updatePushNotificationToken(req.body, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('DEVICE_TOKEN_UPDATED'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to validate push notification token
     * @author Growexx
     * @since 19/05/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async postValidatePushNotificationToken (req, res) {
        try {
            const data = await PushNotificationService.validatePushNotificationToken(req.body, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('DEVICE_TOKEN_VALIDATED'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to send batch notification
     * @author Growexx
     * @since 19/05/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async postSendBatchNotification (req, res) {
        try {
            const data = await PushNotificationService.sendBatchNotification(req.body, res.locals.user, res.__);
            Utils.sendResponse(null, data, res, res.__('BATCH_NOTIFICATION_SENT'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = PushNotificationController;
