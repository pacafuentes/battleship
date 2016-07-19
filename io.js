var Game = require('./models/Game');
var User = require('./models/User');
var Board = require('./models/Board');
var Crypto = require("crypto");

var waitingSocket;
var readySocket = [];
var players =  [];

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
    var userId = socket.handshake.headers.cookie.split('userId=')[1].split(';')[0];
    var gameId = socket.handshake.headers.cookie.split('gameId=')[1].split(';')[0];

    Game.findOne({'id': gameId, 'finished': false}, function (err, game) {
      if (game) {
        Board.findOne({'_id': game.getBoard(game.getOpponentId(userId))}, function (err, board) {
          for(var i = 0; i < board.seenPositions.length; i++) {
            var hited = false;
            for (var k = 0; k < board.immutableShips.length; k++) {
              for (var j = 0; j < board.immutableShips[k].length; j++) {
                if(board.immutableShips[k][j] == board.seenPositions[i]) {
                  socket.emit('hit enemy', '@' + board.seenPositions[i]);
                  hited = true;
                }
              }
            }
            if (!hited) socket.emit('miss enemy', '@' + board.seenPositions[i]);
          }
        });

        Board.findOne({'_id': game.getBoard(userId)}, function (err, board) {
          for(var i = 0; i < board.seenPositions.length; i++) {
            var hited = false;
            for (var k = 0; k < board.immutableShips.length; k++) {
              for (var j = 0; j < board.immutableShips[k].length; j++) {
                if(board.immutableShips[k][j] == board.seenPositions[i]) {
                  socket.emit('hit mine', '@' + board.seenPositions[i]);
                  hited = true;
                }
              }
            }
            if (!hited) socket.emit('miss mine', '@' + board.seenPositions[i]);
          }
        })
      }
    });
    
    socket.on('addShips', function (data) {
      Game.findOne({'id': gameId, finished: false}, function (err, game) {
        Board.findOne({'_id': game.getBoard(userId)}, function (err, board) {
          board.populateBoard(data.ships);
          board.markModified('immutableShips');
          board.save(function (err) { if (err) console.log(err) });
        });
        if (!readySocket[gameId]) readySocket[gameId] = socket;
        else {
          players[gameId + game.getOpponentId(userId)] = socket;
          players[gameId + userId] = readySocket[gameId];
          readySocket[gameId] = null;
        }
        game.playersReady++;
        game.save(function (err) { if (err) console.log(err) });
        if(game.ready()) {
          players[gameId + userId].emit('msg', 'opponent turn');
          socket.emit('msg', 'your turn');
          game.turn = userId;
        }
      });
    });

    socket.on('shot', function (data) {
      Game.findOne({'id': gameId, finished: false}, function (err, game) {
        if (game) {
          if (game.isMyTurn(userId)) {
            var shotPosition = data.split('@')[1];
            Board.findOne({'_id': game.enemyBoard(userId)}, function (err, board) {
              var shotResult = board.hit(shotPosition);
              board.markModified('ships');
              board.save(function (err) {
                if (err) return console.log(err);
                if (shotResult == 'won') game.finished = true;
                game.changeTurn();
                game.save(function (err) {
                  if (err) console.log(err);
                  players[gameId + userId].emit(shotResult + ' mine', data);
                  socket.emit(shotResult + ' enemy', data);
                })
              });
            });
          }
        }
      });
    });
  }
};

module.exports = io;