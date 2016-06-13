var Game = require('../models/game');

module.exports = {
  create: function (req, res) {
    var gameInfo = {
        
    };

    var game = new Game(gameInfo);
    game.save(function (err, game) {
      if(err) console.log(err);
    });
    res.render('index', { title: 'Express' });
  }
};