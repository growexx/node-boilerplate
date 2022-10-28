const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_KEY);
/**
 * Class represents services for stripe payment.
 */
class StripePaymentService {

    /**
     * @desc This function is being used for stripe payment
     * @author Growexx
     * @since 28/10/2022
     * @param {Object} req Request
     * @param {Object} req.body RequestBody
     * @param {Object} res Response
     */
    static async stripePaymentDetails (req, locale) {
        const customer = await stripe.customers.create();
        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: '2022-08-01' }
        );
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1099,
            currency: 'eur',
            customer: customer.id,
            automatic_payment_methods: {
                enabled: true
            }
        });

        locale.json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id
        });
    }

}

module.exports = StripePaymentService;
