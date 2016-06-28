var ObjectId, Board, model, Mixed;

model = require('../util/database').schemas;
ObjectId = require('mongoose').Schema.Types.ObjectId;
Mixed = require('mongoose').Schema.Types.Mixed;

Board = model["class"]('Board', {
  attributes: {
    playerId: {
      type: String
    },
    gameId: {
      type: String
    },
    seenPositions: {
      type: Array
    },
    ships: {
      type: Array
    }
  },

  methods: {
    populateBoard: function(ships) {
      for (var i = 0; i < ships.length; i++){
        console.log(ships);
        var ship = ships[i];
        var frontLetter = ship.front[0];
        var endLetter = ship.end[0];
        var frontNumber = ship.front[1];
        var endNumber = ship.end[1];
        var shipPosition;

        if (frontLetter == endLetter) {
          shipPosition = [];
          for(var j = frontNumber; j <= endNumber; j++){
            shipPosition.push(frontLetter + String(j));
          }
          this.ships.push(shipPosition);
        } else {
          shipPosition = [];
          for (var k = frontLetter.charCodeAt(0); k <= endLetter.charCodeAt(0); k++) {
            shipPosition.push(String.fromCharCode(k) + frontNumber);
          }
          this.ships.push(shipPosition);
        }
      }
    },
    hit: function (position) {

    },
    getSeenPositions: function () {
      
    }
  }
});

module.exports = Board;
