const validation = require('../../util/validation');
const GeneralError = require('../../util/GeneralError');
const REQUIRED = 'FIELD_REQUIRED';
const INVALID = 'FIELD_NOT_VALID';

/**
 * Class represents validations for user Basic Profile.
 */
class PushNotificationValidator extends validation {
    constructor (body, locale) {
        super(locale);
        this.body = body;
    }

    title (title) {
        if (!title) {

            throw new GeneralError(this.__(REQUIRED, 'Title'), 400);
        }
    }

    notificationBody (notificationBody) {

        if (!notificationBody) {
            throw new GeneralError(this.__(REQUIRED, 'Body'), 400);
        }
    }

    userId (userId) {

        if (!userId) {
            throw new GeneralError(this.__(REQUIRED, 'User ID'), 400);
        }
    }

    deviceToken (deviceToken) {
        if (deviceToken.length === 0) {

            throw new GeneralError(this.__(REQUIRED, 'Device Token'), 400);
        }
    }

    deviceType (deviceType) {
        const deviceTypes = ['ios', 'android', 'web'];
        if (!deviceTypes.includes(deviceType)) {

            throw new GeneralError(this.__(INVALID, 'Device Type'), 400);
        }
    }

}

module.exports = PushNotificationValidator;
