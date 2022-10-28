
const StripePaymentService = require('././stripePaymentService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for stripe payment.
 */
class StripePaymentController {

    /**
     * @desc This function is being used for stripe payment
     * @author Growexx
     * @since 28/10/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {function} res Response
     */
    static async stripePaymentDetails (req, res) {
        try {
            const data = await StripePaymentService.stripePaymentDetails(req, res.__);
            Utils.sendResponse(null, data, res, ('SUCCESS'));
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = StripePaymentController;
