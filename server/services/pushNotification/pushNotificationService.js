const User = require('../../models/user.model');
const PushNotificationValidator = require('./pushNotificationValidator');
const UtilFunctions = require('../../util/utilFunctions');
const Notification = require('../../models/notification.model');
/**
 * Class represents services for user Basic Profile.
 */
class PushNotificationService {

    /**
     * @desc This function is being used to store notification in database to send later
     * @author Growexx
     * @since 19/05/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async createNotification (req, user, locale) {
        const Validator = new PushNotificationValidator(null, locale);
        const { title, body, userId, clickAction, appIcon } = req.body;
        Validator.title(title);
        Validator.notificationBody(body);
        Validator.userId(userId);
        await Notification.create({
            userId,
            title,
            body,
            click_action: clickAction || '',
            icon: appIcon || ''
        });
    }


    /**
     * @desc This function is being used to send push notification to android devices
     * @author Growexx
     * @since 19/05/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.title title
     * @param {Object} req.body.body body
     * @param {Object} req.body.deviceToken deviceToken
     */
    static async individualPushNotificationForAndroid (req, locale) {
        const Validator = new PushNotificationValidator(null, locale);
        const { title, body, deviceToken } = req.body;
        Validator.title(title);
        Validator.notificationBody(body);
        Validator.deviceToken(deviceToken);

        UtilFunctions.sendPushNotificationToAndroidDevice(req.body);
    }

    /**
     * @desc This function is being used to send push notification to web apps
     * @author Growexx
     * @since 19/05/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} req.body.title title
     * @param {Object} req.body.body body
     * @param {Object} req.body.deviceToken deviceToken
     */
    static async individualPushNotificationForWeb (req, locale) {
        const Validator = new PushNotificationValidator(null, locale);
        const { title, body, deviceToken } = req.body;
        Validator.title(title);
        Validator.notificationBody(body);
        Validator.deviceToken(deviceToken);

        UtilFunctions.sendPushNotificationToWeb(req.body);
    }

    /**
     * @desc This function is being used to update push notification token
     * @author Growexx
     * @since 19/05/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async updatePushNotificationToken (data, user, locale) {
        const Validator = new PushNotificationValidator(null, locale);
        const { deviceType, deviceToken } = data;
        Validator.deviceToken(deviceToken);
        Validator.deviceType(deviceType);

        const updateObj = {};
        const type = deviceType.toLowerCase();
        const currentDate = MOMENT().utc();

        switch (type) {
            case 'android':
                updateObj.androidDeviceToken = deviceToken;
                updateObj.androidDeviceTokenTimestamp = currentDate;
                break;
            case 'ios':
                updateObj.iosDeviceToken = deviceToken;
                updateObj.iosDeviceTokenTimestamp = currentDate;
                break;
            case 'web':
                updateObj.webDeviceToken = deviceToken;
                updateObj.webDeviceTokenTimestamp = currentDate;
                break;
            default:

                break;
        }
        await User.updateOne({
            _id: user._id
        }, {
            $set: updateObj
        });
    }
    /**
     * @desc This function is being used to validate push notification token
     * @author Growexx
     * @since 25/05/2021
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async validatePushNotificationToken (data, user) {
        const Validator = new PushNotificationValidator(null);
        const { deviceType } = data;
        Validator.deviceType(deviceType);
        const type = deviceType.toLowerCase();
        const todaysDate = MOMENT().utc();
        let differenceInDays;

        switch (type) {
            case 'android':
                differenceInDays = UtilFunctions.findDifferenceBetweenDates(todaysDate, user.androidDeviceTokenTimestamp, 'days' );
                break;
            case 'ios':
                differenceInDays = UtilFunctions.findDifferenceBetweenDates(todaysDate, user.iosDeviceTokenTimestamp, 'days' );
                break;
            case 'web':
                differenceInDays = UtilFunctions.findDifferenceBetweenDates(todaysDate, user.webDeviceTokenTimestamp, 'days' );
                break;
            default:

                break;
        }

        if ( differenceInDays === null || differenceInDays === '' || differenceInDays > 30) {
            throw {
                message: MESSAGES.TOKEN_EXPIRED,
                statusCode: 400
            };
        }
    }

    /**
     * @desc This function is being used  to get notification of the group created in firebase
     * @author Growexx
     * @since 19/05/2021
     * @param {String} groupName groupName
     */
    static async sendBatchNotification () {
        const messages = await this.getUndeliveredMessages();
        await UtilFunctions.sendBatchNotification(messages.notificationPayload);
        if (!messages.notificationPayload.length) {
            throw {
                message: MESSAGES.NO_DATA_FOUND,
                statusCode: 400
            };
        } else {
            await this.deleteAllNotifications(messages.messageIds);
        }
    }
    static async deleteAllNotifications (messages) {

        const messageId = messages.map(id => id);

        return await Notification.deleteMany({
            _id: { $in: messageId }
        });
    }
    static async getUndeliveredMessages () {
        const unSendNotifications = await Notification.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $ne: ['$webDeviceToken', null]
                                }
                            }
                        },
                        {
                            $project: {
                                _id: 1, webDeviceToken: 1
                            }
                        }
                    ],
                    as: 'userData'
                }
            },
            { $unwind: '$userData' },
            {
                $project: {
                    _id: 1, title: 1, body: 1, userData: 1
                }
            }
        ]);


        const notificationPayload = unSendNotifications.map(data => {
            return {
                notification: {
                    title: data.title,
                    body: data.body
                },
                token: data.userData.webDeviceToken
            };
        });
        const messageIds = unSendNotifications.map(message => message._id);
        return { notificationPayload, messageIds };
    }
}

module.exports = PushNotificationService;
