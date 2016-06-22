var express, controllers, router;

express = require('express');
router = express.Router();
controllers = require('./controllers');

router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/game', controllers.game.create);

router.post('/game/board', controllers.game.addBoard);

module.exports = router;