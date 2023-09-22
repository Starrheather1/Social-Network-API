const { Schema, model } = require('mongoose');

// Schema to create Student model
const reactionSchema = new Schema(
  {
   
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

module.exports = reactionSchema;
