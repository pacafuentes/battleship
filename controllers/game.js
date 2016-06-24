var Game = require('../models/game');

module.exports = {
  create: function (req, res) {
    res.render('board');
  },

  addBoard: function (req, res) {
    res.sendStatus(200);
  }
};