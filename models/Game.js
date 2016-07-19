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
    },
    turn : {
      type: String
    }
  },

  methods: {
    getBoard: function (userId) { return userId == this.player1Id ? this.board1Id : this.board2Id; },
    enemyBoard: function (userId) { return userId == this.player1Id ? this.board2Id : this.board1Id; },
    ready: function () { return this.playersReady == 2; },
    getOpponentId: function (userId) { return userId == this.player1Id ? this.player2Id : this.player1Id; },
    isMyTurn: function (userId) { return userId == this.turn},
    changeTurn : function () { 
      if (this.turn == this.player1Id) this.turn = this.player2Id;
      else this.turn = this.player1Id;
    }
  }
});

module.exports = Game;