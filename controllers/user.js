User = require('../models/User');

module.exports = {
  login: function (req, res) {
    User.findOne({'id' : req.body.id}, function (err, user) {
        if (!user) {
          var userInfo = {
            id : req.body.id,
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            played: 0,
            won: 0
          };

          user = new User(userInfo);
          user.save(function (err) {
            if(err) {
              console.log(err);
              return res.sendStatus(500);
            }
            return res.render('board');
          });
        }

        return res.render('board');
    });
  }
};

