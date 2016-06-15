var express, controllers, router;

express = require('express');
router = express.Router();
controllers = require('./controllers');

router.get('/game', controllers.game.create);

router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;