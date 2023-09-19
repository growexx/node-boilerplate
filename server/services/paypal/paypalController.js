
const PaypalService = require('./paypalService');
const Utils = require('../../util/utilFunctions');
/**
 * Class represents controller for paypal services.
 */
class PaypalController {
    /**
     * @desc This function is being used to create paypal order.
     * @author Growexx
     * @since 27/04/2023
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async createOrder (req, res) {
        try {
            const data = await PaypalService.createOrder();
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            console.log(error);
            Utils.sendResponse(error, null, res, error.message);
        }
    }

    /**
     * @desc This function is being used to capture paypal order.
     * @author Growexx
     * @since 27/04/2023
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async captureOrder (req, res) {
        try {
            const data = await PaypalService.captureOrder(req, res.__);
            Utils.sendResponse(null, data, res, res.__('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = PaypalController;
