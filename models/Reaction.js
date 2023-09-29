const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId, // Use Mongoose's ObjectId data type
    default:new mongoose.Types.ObjectId, // Default value is set to a new ObjectId
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280, // 280 character maximum
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Set default value to the current timestamp
  },
});

// Define a getter method to format the timestamp on query
reactionSchema.virtual('formattedCreatedAt').get(function () {
  // Customize the date formatting as needed
  return this.createdAt.toLocaleString();
});

module.exports = mongoose.model('Reaction', reactionSchema);