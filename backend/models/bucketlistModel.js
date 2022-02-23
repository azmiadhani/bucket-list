const mongoose = require('mongoose');
const bucketlistSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a bucket list name value'],
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('bucketlists', bucketlistSchema);
