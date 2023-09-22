const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
