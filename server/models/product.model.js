/**
 * @name product model
 * @author Growexx
 */
const appMongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const schema = new appMongoose.Schema({
  foodName: {
    type: String,
    unique: true,
  },
  foodType: {
    type: String,
  },
  quantity: {
    type: Number,
    min: 1,
    max: 10,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },
  extras: {
    type: [String],
  },
  isEnabled: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

module.exports = appMongoose.model('product', schema);
