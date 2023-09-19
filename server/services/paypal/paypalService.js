const PAYPAL_URL = process.env.PAYPAL_BASE_URL;
const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET_KEY } = process.env;
const axios = require('axios');
const GeneralError = require('../../util/GeneralError');
/**
 * Class represents services for paypal operations
 */
class PaypalService {
    /**
     * @desc This function is being used to create paypal order
     * @author Growexx
     * @since 27/04/2023
     * @param {Object} req Request
     * @param {Object} res Response
     */
    static async createOrder () {
        const accessToken = await PaypalService.generateAccessToken();
        const amount = 100;
        const currency = 'USD';
        const url = `${PAYPAL_URL}/v2/checkout/orders`;
        const { data } = await axios.post(url, {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: currency,
                        value: amount
                    }
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        });
        return data;
    }

    /**
     * @desc This function is being used to create paypal order
     * @author Growexx
     * @since 27/04/2023
     * @param {Object} req Request
     * @param {Object} res Response
     */
    static async captureOrder (req, locale) {
        const { orderId } = req.body;
        if (!orderId) {
            throw new GeneralError(locale('FIELD_REQUIRED', 'orderId'), 400);
        }
        const accessToken = await PaypalService.generateAccessToken();
        const url = `${PAYPAL_URL}/v2/checkout/orders/${orderId}/capture`;
        const { data } = await axios.post(url, null, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        });
        return data;
    }


    static async generateAccessToken () {
        const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET_KEY}`).toString('base64');
        const url = `${PAYPAL_URL}/v1/oauth2/token`;
        const response = await axios.post(url, 'grant_type=client_credentials', {
            headers: {
                Authorization: `Basic ${auth}`
            }
        });
        return response.data.access_token;
    }
}

module.exports = PaypalService;
