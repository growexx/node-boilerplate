const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    paymentIntentId: {
        type: String,
        required: true
    },
    stripeProductId: {
        type: String,
        required: true
    },
    stripePriceId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['failed', 'paid', 'processing'],
        default: 'processing'
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    recurring: {
        type: Boolean
    },
    recurringInterval: {
        type: String,
        enum: ['day', 'week', 'month', 'year',null]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
