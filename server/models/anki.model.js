/**
 * @name Flashcard model
 * @author Growexx
 */
const appMongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const schema = new appMongoose.Schema({
      question: {
        type: String,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
      interval: {
        type: Number,
        default: 1,
      },
      dueDate: {
        type: Date,
        required: true,
      },
      history: [
        {
          reviewedAt: Date,
          grade: {
            type: String,
            enum: ['1', '2', '3', '4', '5'],
          },
        },
      ],
});

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

module.exports = appMongoose.model('Flashcard', schema);
