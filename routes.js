var express, controllers, router;

express = require('express');
router = express.Router();
controllers = require('./controllers/user');

router.get('/user', controllers.create);

router.get('/', function (req, res) {
  res.render('index', { title: 'Battleship' });
});
router.get('/about', function (req, res) {
  res.render('about', { title: 'About' });
});


module.exports = router;
