const HTTPStatus = require('../util/http-status');
const FirebaseConfig = require('./FirebaseConfig');
const axios = require('axios');
const { initializeApp, cert } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');
const serviceAccount = require('../public/serviceAccountKey.json');
initializeApp({
    credential: cert(serviceAccount)
});
/**
 * This class reprasents common utilities for application
 */
class Utils {
    static errorResponse () {
        return JSON.parse(
            JSON.stringify({
                status: 0,
                data: {},
                message: ''
            })
        );
    }

    static successResponse () {
        return JSON.parse(
            JSON.stringify({
                status: 1,
                data: {},
                message: ''
            })
        );
    }

    /**
     * This function is being used to add pagination for user table
     * @auther Growexx
     * @param {string} error Error Message
     * @param {Object} data Object to send in response
     * @param {Object} res Response Object
     * @param {string} successMessage success message
     * @param {Object} additionalData additional data outside of data object in response
     * @param {string} successMessageVars
     * @since 01/03/2021
     */
    static sendResponse (error, data, res, successMessage, successMessageVars) {
        let responseObject;

        if (error) {
            let status;
            responseObject = Utils.errorResponse();
            if (typeof error === 'object') {
                responseObject.message = error.message
                    ? error.message : res.__('ERROR_MSG');
                status = error.statusCode ? error.statusCode : HTTPStatus.BAD_REQUEST;
            } else {
                responseObject.message = res.__(error);
                status = HTTPStatus.BAD_REQUEST;
            }

            responseObject.data = error.data;
            res.status(status).send(responseObject);
        } else {
            responseObject = Utils.successResponse();
            responseObject.message = successMessageVars
                ? res.__.apply('', [successMessage].concat(successMessageVars))
                : successMessage;
            responseObject.data = data;
            res.status(HTTPStatus.OK).send(responseObject);
        }
    }

    static generateOtp () {
        if (process.env.NODE_ENV === 'testing') {
            return 123456;
        } else {
            return Math.floor(Math.random() * 900000) + 100000;
        }
    }

    static async sendPushNotificationToAndroidDevice (payload) { 
        const {
            title,
            body,
            deviceToken
        } = payload;

        const messageObj = {
            notification: { title, body },
            token: deviceToken
        };
        await FirebaseConfig.init.getMessaging().send(messageObj);
    }

    static async sendPushNotificationToWeb (payload) {
        const {
            title,
            body,
            clickAction,
            icon,
            deviceToken
        } = payload;

        const messagePayload = {
            notification: {
                title,
                body,
                icon,
                click_action: clickAction
            },
            to: deviceToken
        };
        await axios.post(CONSTANTS.FIREBASE.FCM_URL, messagePayload, {
            headers: {
                Authorization: `key=${CONSTANTS.FIREBASE.FCM_SERVER_KEY}`
            }
        });
    }

    static async sendBatchNotification (payload) {
        const promises = [];
        const chunkSize = 100;
        for (let i = 0; i < payload.length; i += chunkSize) {
            const batchOfHundredNotification = payload.slice(i, i + chunkSize);
            promises.push(getMessaging().sendAll(batchOfHundredNotification));
        }
        await Promise.all(promises);
    }

    static findDifferenceBetweenDates (firstDate, secondDate, measurement) {
        return firstDate.diff(secondDate, measurement);
    }
}

module.exports = Utils;
