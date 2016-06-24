var Game = require('../models/Game');

module.exports = {
  create: function (req, res) {
    res.render('board');
  },

  addBoard: function (req, res) {
    res.sendStatus(200);
  }
};