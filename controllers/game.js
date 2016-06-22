var Game = require('../models/game');

module.exports = {
  create: function (req, res) {
    console.log(res);
    res.render('board');
  },

  addBoard: function (req, res) {
    console.log(req.body);
    res.sendStatus(200);
  }
};