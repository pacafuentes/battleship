var Game = require('../models/Game');

module.exports = {
  create: function (req, res) {
    console.log(req.params.id);
    res.render('game');
  }
};