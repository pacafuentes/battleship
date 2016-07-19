var Game = require('../models/Game');

module.exports = {
  create: function (req, res) {
    var gameId = req.params.id;
    res.render('game');
  }
};