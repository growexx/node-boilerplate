/**
 * @name template model
 * @author Growexx
 */
const db = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const schema = new db.Schema({
    vendorName: {
        type: String,
        required: true
    },
    vendorAddress: {
        type: String,
        required: true
    },
    merchantId: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    subTotal: {
        type: String,
        required: true
    },
    tax: {
        type: String,
        required: true
    },
    itemsSold: {
        type: Number,
        required: true
    },
    operatorNumber: {
        type: Number,
        required: true
    },
    operatorName: {
        type: String,
        required: true
    },
    purchasedItems: {
        type: Object,
        schema: {
            product: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            }
        }
    }
}, { toJSON: { getters: true }, timestamps: true });

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

module.exports = db.model('ocr_bill', schema);
