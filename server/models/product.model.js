const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    stripeProductId: {
        type: String,
        required: true,
        unique: true
    },
    stripePriceId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
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
    active: {
        type: Boolean,
        default: true
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

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
