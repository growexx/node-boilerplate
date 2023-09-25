/**
 * @name Flashcard model
 * @author Growexx
 */
const appMongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const schema = new appMongoose.Schema({
      name: {
        type: String,
      },
      title: {
        type: String,
      },
      company: {
        type: String,
      },
      lastInteractionDate: {
        type: Date,
      },
      interactionType: {
        type: String,
        enum: ['formal', 'casual', 'social'],
      },
      notes: {
        type: String,
      },
      priorityScore: {
        type: Number,
        default: 0
      }
});

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

module.exports = appMongoose.model('LinkedInConnection', schema);
