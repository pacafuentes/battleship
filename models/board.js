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
      for (var i = 0; i < this.ships.length; i++) {
        for (var j = 0; j < this.ships[i].length; j++) {
          if(this.ships[i][j] == position) {
            this.ships[i].splice(j, 1);
            if (this.ships[i].length == 0) {
              this.ships.splice(i, 1);
              return 'sink';
            }
            return 'hit'
          }
        }
      }
      return this.ships.length == 0 ? 'won' : 'miss';
    },
    getSeenPositions: function () {
      
    }
  }
});

module.exports = Board;
