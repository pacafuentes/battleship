var express, controllers, router;

express = require('express');
router = express.Router();
controllers = require('./controllers/user');

router.get('/user', controllers.create);

router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
