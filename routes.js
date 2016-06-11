var express, controllers, router;

express = require('express');
// controllers = require('../controllers');
router = express.Router();

/* GET users listing. */
router.get('/user', function(req, res, next) {
  User = require('./models/user');

  var userInfo = {
    username: "Paca",
    firstName: "Santiago",
    lastName: "Fuents",
    played: 3,
    won: 3
  };

  var user = new User(userInfo);
  user.save(function (err, user) {
    if(err) console.log(err);
  });
  console.log("awanta");
  res.render('index', { title: 'Express' });
});

module.exports = router;
