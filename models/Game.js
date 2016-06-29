var ObjectId, Game, model;

model = require('../util/database').schemas;
ObjectId = require('mongoose').Schema.Types.ObjectId;

Game = model["class"]('Game', {
  attributes: {
    player1: {
      type: ObjectId,
      required: true
    },
    player2: {
      type: ObjectId,
      required: true
    }
  }
});

module.exports = Game;