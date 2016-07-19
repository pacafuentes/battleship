var Game = require('./models/Game');
var User = require('./models/User');
var Board = require('./models/Board');
var Crypto = require("crypto");


var waitingSocket;

var io =  {
  home: function (socket) {

    var userId = socket.handshake.headers.cookie.split('userId=')[1].split(';')[0];
    if (!waitingSocket) 
      return User.findOne({'id' : userId}, function (err, user) {
        if (user) waitingSocket = { userId: userId, socket: socket};
        socket.emit('waiting opponent');
      });
    
    User.findOne({'id': userId}, function (err, user) {
      if (user) {
        var gameId = Crypto.createHash('md5')
          .update(waitingSocket.userId + userId + new Date().toString())
          .digest('hex');
        
        var game = new Game({
          id: gameId,
          player1Id: waitingSocket.userId,
          board1Id: new Board(),
          player2Id: userId,
          board2Id: new Board()
        });

        game.save(function (err) { if (err) console.log(err) });
        
        waitingSocket.socket.emit('battle', gameId);
        socket.emit('battle', gameId);
        waitingSocket = null;
      }
    })
  },
  
  game: function (socket) {

    socket.on('addShips', function (data) {
      var boardInfo = {
        seenPositions: []
      };
      var board = new Board(boardInfo);
      board.populateBoard(data.ships);
      var game = games.get(gameId);

      if (player == 1) {
        game.player1.board = board;
        if (game.player2.board) {
          game.player1.socket.emit('msg', 'your turn');
          game.player2.socket.emit('msg', 'opponents turn');
        } else game.player1.socket.emit('msg', 'waiting for opponent...');
      } else {
        game.player2.board = board;
        if (game.player1.board) {
          game.player1.socket.emit('msg', 'your turn');
          game.player2.socket.emit('msg', 'opponents turn');
        } else game.player2.socket.emit('msg', 'waiting for opponent');
      }

    });

    socket.on('shot', function (data) {
      var shot = data.split('@')[1];
      var shotResult;
      var game = games.get(gameId);
      if (player == 1 && game.turn == 1) {
        shotResult = game.player2.board.hit(shot);
        game.turn = 2;
        game.player1.socket.emit(shotResult + ' enemy', data);
        game.player2.socket.emit(shotResult + ' mine', data);
      } else if (player == 2 && game.turn == 2) {
        shotResult = game.player1.board.hit(shot);
        game.turn = 1;
        game.player1.socket.emit(shotResult + ' mine', data);
        game.player2.socket.emit(shotResult + ' enemy', data);
      }
    });
  }
};

module.exports = io;