const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio');
const client = twilio(accountSid, authToken);
class SmsService {
    /**
     * This function is being used to send sms messages to specific mobile device
     * @author Growexx
     * @param {Object} to to
     * @param {function} msg msg
     * @since 21/09/2023
     */
    static async sendSMS (to, msg, provider = client ) {
        return await provider.messages.create({
            body: msg,
            from: process.env.TWILIO_MOBILE_NUMBER,
            to: '+917575010701'
        });
    }
}

module.exports = SmsService;
