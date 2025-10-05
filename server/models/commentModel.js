const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
  {
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Ticket',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: { type: String, required: [true, 'Please add text'] },
    type: {
      type: String,
      required: true,
      enum: ['comment', 'log'],
      default: 'comment',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);