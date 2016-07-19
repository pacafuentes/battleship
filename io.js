var Game = require('./models/Game');
var User = require('./models/User');
var Board = require('./models/Board');
var Crypto = require("crypto");
var HashMap = require('hashmap');


var waitingSocket;
var players =  new HashMap();

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

        var board1 = new Board({seenPositions: []});
        var board2 = new Board({seenPositions: []});
        var game = new Game({
          id: gameId,
          player1Id: waitingSocket.userId,
          board1Id: board1,
          player2Id: userId,
          board2Id: board2,
          finished: false,
          playersReady: 0
        });

        players.set(gameId + waitingSocket.userId, socket);
        players.set(gameId + userId, waitingSocket.socket);

        board1.save(function (err) { if (err) console.log(err) });
        board2.save(function (err) { if (err) console.log(err) });
        game.save(function (err) { if (err) console.log(err) });
        
        waitingSocket.socket.emit('battle', gameId);
        socket.emit('battle', gameId);
        waitingSocket = null;
      }
    })
  },
  
  game: function (socket) {
    socket.on('addShips', function (data) {
      Game.findOne({'id': data.gameId, finished: false}, function (err, game) {
        Board.findOne({'_id': game.getBoard(data.userId)}, function (err, board) {
          board.populateBoard(data.ships);
          board.save(function (err) { if (err) console.log(err) });
        });
        game.playersReady++;
        game.save(function (err) { if (err) console.log(err) });
        if(game.ready()) players.get(data.gameId + data.userId).emit('msg', 'ready');
      });
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