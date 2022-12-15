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
    mappedFields: {
        type: [String],
        required: true
    }
}, { toJSON: { getters: true }, timestamps: true });

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

module.exports = db.model('ocr_template', schema);
