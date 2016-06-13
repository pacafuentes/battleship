var Game = require('./models/game');
var User = require('./models/user');
var Board = require('./models/board');

var games;

io =  {
  handler : function (socket) {
    socket.on('addShip', function (data) {

    });

    socket.on('shot', function (data) {
      
    });
  }
};

module.exports = io;