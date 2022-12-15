/**
 * @name VendonrName model
 * @author Growexx
 */
const db = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const schema = new db.Schema({
    vendorName: {
        type: String,
        set: value => value.trim()
    },
    vendorLocation: {
        type: String,
        set: value => value.trim()
    },
    uniqueParameter: {
        type: String,
        set: value => value.trim()
    },
    vendorConfig: {
        type: Object,
        schema: {
            prevValue: {
                type: String,
                set: value => value.trim()
            },
            prevValueIndex: {
                type: Number
            },
            nextValue: {
                type: String,
                set: value => value.trim()
            },
            nextValueIndex: {
                type: Number
            }
        }
    },
    psVendorName: {
        type: String
    },
    documentType: {
        type: String
    }
}, { timestamps: true });

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

module.exports = db.model('ocr_vendor_name', schema);
