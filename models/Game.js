var ObjectId, Game, model;

model = require('../util/database').schemas;
ObjectId = require('mongoose').Schema.Types.ObjectId;

Game = model["class"]('Game', {
  attributes: {
    id: {
      type: String,
      required: true,
      unique: true
    },
    player1Id: {
      type: String,
      required: true
    },
    board1Id : {
      type: ObjectId,
      required: true
    },
    player2Id: {
      type: String,
      required: true
    },
    board2Id : {
      type: ObjectId,
      required: true
    }
  },

  methods: {
    getBoard: function (playerId) { return playerId == player1Id ? board1Id : board2Id; }
  }
});

module.exports = Game;