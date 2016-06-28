var Game = require('./models/Game');
var User = require('./models/User');
var Board = require('./models/Board');
var HashMap = require('hashmap');
var Crypto = require("crypto");

var games = new HashMap();
var waitingSocket;

var io =  {
  handler : function (socket) {
    var session = socket.handshake.headers.cookie.split('session=')[1].split(';')[0];
    var gameId = Crypto.randomBytes(10).toString('hex');
    var player;

    if (!waitingSocket) {
      player = 1;
      waitingSocket = {socket: socket, session: session, gameId: gameId};
      socket.emit('waiting opponent');
    } else if (session != waitingSocket.session) {
      player = 2;
      gameId = waitingSocket.gameId;
      games.set(gameId,{
        player1: {
          socket: waitingSocket.socket,
          board: undefined
        },
        player2: {
          socket: socket,
          board: undefined
        },
        turn: 1
      });
      waitingSocket.socket.emit('battle');
      socket.emit('battle');
      waitingSocket = undefined;
    }

    socket.on('addShips', function (data) {
      var boardInfo = {
        seenPositions: [],
        ships: data.ships
      };
      var board = new Board(boardInfo);
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

    });
  }
};

module.exports = io;