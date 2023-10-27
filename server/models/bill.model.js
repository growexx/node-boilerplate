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
        required: false
    },
    merchantId: {
        type: String,
        required: false
    },
    amount: {
        type: String,
        required: false
    },
    subTotal: {
        type: String,
        required: false
    },
    tax: {
        type: String,
        required: false
    },
    itemsSold: {
        type: Number,
        required: false
    },
    operatorNumber: {
        type: Number,
        required: false
    },
    operatorName: {
        type: String,
        required: false
    },
    purchasedItems: {
        type: Object,
        schema: {
            product: {
                type: String,
                required: false
            },
            price: {
                type: String,
                required: false
            }
        }
    }
}, { toJSON: { getters: true }, timestamps: true });

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

module.exports = db.model('ocr_bill', schema);
