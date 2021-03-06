var ObjectId, User, model;

model = require('../util/database').schemas;
ObjectId = require('mongoose').Schema.Types.ObjectId;

User = model["class"]('User', {
  attributes: {
    id: {
      type: String,
      unique: true,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    picture: {
      type: String
    },
    currentGame: {
      type: ObjectId
    },
    played: {
      type: Number,
      required: true
    },
    won: {
      type: Number,
      required: true
    }
  }
});

module.exports = User;