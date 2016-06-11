var express, controllers, router;

express = require('express');
router = express.Router();
controllers = require('./controllers/user');

router.get('/user', controllers.create);

module.exports = router;
