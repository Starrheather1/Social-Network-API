const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true
   // match: [/.+@.+\..+/, 'Must match an email address!']
  },

  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],

  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
/*
  toJSON: {
    getters: true,
  },
*/
});

const User = mongoose.model('User', UserSchema);
console.log("User model",User)

module.exports = User;
