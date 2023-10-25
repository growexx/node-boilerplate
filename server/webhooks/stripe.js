const Payment = require('../models/payment.model');
const Stripe = require('../util/stripe');

module.exports = async (request, response) => {
    const signature = request.headers['stripe-signature'];
    let event;
    let paymentIntentId;
    try {
        event = await Stripe.constructWebhookEvent(request.rawBody, signature);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    switch (event.type) {
        case 'payment_intent.canceled':
        case 'payment_intent.payment_failed':
            paymentIntentId = event.data.object.id;
            await Payment.updateOne({ paymentIntentId },{ status: 'failed' });
            break;
        case 'payment_intent.succeeded':
        case 'checkout.session.completed':
            paymentIntentId = event.data.object.id;
            await Payment.updateOne({ paymentIntentId },{ status: 'paid' });
            break;
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
};
