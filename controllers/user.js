var User = require('../models/User');

module.exports = {
  login: function (req, res) {
    User.findOne({'id' : req.body.userInfo.id}, function (err, user) {
      if (err) console.log(err);
      if (!user) {
        var userInfo = {
          id : req.body.userInfo.id,
          firstName: req.body.userInfo.first_name,
          lastName: req.body.userInfo.last_name,
          picture: req.body.userInfo.picture.data.url,
          played: 0,
          won: 0
        };

        user = new User(userInfo);
        user.save(function (err) {
          if(err) {
            console.log(err);
            return res.sendStatus(500);
          }
        });
        }
        console.log(user);
        req.session.user = user;
        res.status(200).json({redirectTo: '/home'});
    });
  },

  home: function (req, res) {
    res.render('home', {user:req.session.user});
  }
};

