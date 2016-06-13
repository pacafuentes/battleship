var ObjectId, Board, model, Mixed;

model = require('../util/database').schemas;
ObjectId = require('mongoose').Schema.Types.ObjectId;
Mixed = require('mongoose').Schema.Types.Mixed;

Board = model["class"]('Board', {
  attributes: {
    playerId: {
      type: ObjectId,
      required: true
    },
    gameId: {
      type: ObjectId,
      required: true
    },
    seenPositions: {
      type: Array
    },
    ships: {
      type: Mixed
    }
  },

  methods: {
    addShip: function(ship, bowPosition) {
      //check if ship fit on the board
    },
    hit: function (position) {
      //check if a ship is in position, returns hit, water, sunken (hundido)
    },
    getSeenPositions: function () {
      
    }
  }
});

module.exports = Board;
