var express, controllers, router;

express = require('express');
router = express.Router();
controllers = require('./controllers');

router.get('/', function (req, res) {
  res.render('index', { title: 'Battleship!' });
});

router.post('/login', controllers.user.login);

router.get('/home', controllers.user.home);

router.get('/game/:id', controllers.game.create);


module.exports = router;