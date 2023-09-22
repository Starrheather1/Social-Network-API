const { Schema, model } = require('mongoose');

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
