var Game = require('./models/Game');
var User = require('./models/User');
var Board = require('./models/Board');

var board1;
var board2;
var turn;
var socket1;
var socket2;

io =  {
  handler : function (socket) {
    socket.on('addShips', function (data) {
      if (!socket1) {
        socket1 = socket;
        var boardInfo = {
          playerId: '1',
          gameId: '1',
          seenPositions: [],
          ships: data.ships
        };

        board1 = new Board(boardInfo);
        socket.emit('msg', 'waiting for opponent');
        console.log(board1);
      } else {
        socket2 = socket;

        var boardInfo = {
          playerId: '2',
          gameId: '1',
          seenPositions: [],
          ships: data.ships
        };

        board2 = new Board(boardInfo);
        turn = 2;
        socket2.emit('msg', 'your turn!');
        console.log(board2);
      }
    });

    socket.on('shot', function (data) {
      if (turn == 2) {
        console.log(data);
        socket1.emit('msg', 'your turn!');
        socket2.emit('msg', 'waiting for opponent...');
      } else if (turn == 1){
        console.log(data);
        socket2.emit('msg', 'your turn!');
        socket1.emit('msg', 'waiting for opponent...');
      }
      turn = turn == 1 ? 2 : 1;
    });
  }
};

module.exports = io;