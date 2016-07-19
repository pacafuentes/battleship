var Game = require('../models/Game');
var User = require('../models/User');

module.exports = {
  create: function (req, res) {
    var gameId = req.params.id;
    Game.findOne({'id': gameId, 'finished': false, $or : [{player1Id: req.session.user.id}, {player2Id: req.session.user.id}]}, function (err, game) {
      console.log(game);
      if (game) {
        User.findOne({'id': game.getOpponentId(req.session.user.id)}, function (err, user) {
          res.cookie('gameId', gameId);
          res.render('game', {user: req.session.user, opponent: user});
        })
      }
      else res.set('Location', '/home').status(307).send();
    });
  }
};