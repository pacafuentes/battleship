var Game = require('./models/game');
var User = require('./models/user');
var Board = require('./models/board');

var board1;
var board2;

io =  {
  handler : function (socket) {
    socket.on('addShips', function (data) {
      if (!board1) {
        var boardInfo = {
          playerId: '1',
          gameId: '1',
          seenPositions: [],
          ships: data.ships
        };

        var board1 = new Board(boardInfo);
        console.log(board1);
      } else {
        var boardInfo = {
          playerId: '2',
          gameId: '1',
          seenPositions: [],
          ships: data.ships
        };

        var board2 = new Board(boardInfo);
        console.log(board2);
      }
    });

    socket.on('shot', function (data) {
      socket.emit('hit', 'hundido')
    });
  }
};

module.exports = io;