
const mongoose = require('mongoose');
const reactionSchema=require("./Reaction").schema 


const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now // Set default value to the current timestamp
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema] // Array of nested reaction documents
});

// Define a getter method to format the timestamp on query
thoughtSchema.virtual('formattedCreatedAt').get(function () {
  // Customize the date formatting as needed
  return this.createdAt.toLocaleString();
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;