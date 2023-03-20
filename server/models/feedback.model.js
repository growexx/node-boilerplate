/**
 * @name feedback model
 * @author Growexx
 */
const appMongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const schema = new appMongoose.Schema({
    userId: {
        type: appMongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    title: {
        type: String,
        trim: true,
        min: 5,
        max: 30
    },
    description: {
        type: String,
        trim: true,
        min: 5,
        max: 150
    },
    isActive: {
        type: Number,
        default: 1,
        // 0 = Inactive, 1 = Active, 2 = Deleted
        enum: [0, 1, 2]
    }
}, { timestamps: true });

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

module.exports = appMongoose.model('feedback', schema);
