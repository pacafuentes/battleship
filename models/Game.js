var ObjectId, Game, model;

model = require('../util/database').schemas;
ObjectId = require('mongoose').Schema.Types.ObjectId;
var Board = require('./Board');

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
    },
    finished : {
      type: Boolean,
      required: true
    },
    playersReady : {
      type: Number,
      required: true
    }
  },

  methods: {
    getBoard: function (userId) { return userId == this.player1Id ? this.board1Id : this.board2Id; },
    setBoard: function (userId, boardId) { 
      if (userId == this.player1Id) this.board1Id = boardId;
      else this.board2Id = boardId
    },
    ready: function () { return this.playersReady == 2; },
    getOpponentId: function(userId) { return userId == this.player1Id ? this.player2Id : this.player1Id; }
  }
});

module.exports = Game;