var User = require('../models/User');

function homeRedirect(res) {
  res.set('Location', '/').status(307).send();
}
module.exports = {
  login: function (req, res) {
    User.findOne({'id' : req.body.userInfo.id}, function (err, user) {
      if (!user) {
        var userInfo = {
          id: req.body.userInfo.id,
          firstName: req.body.userInfo.first_name,
          lastName: req.body.userInfo.last_name,
          picture: req.body.userInfo.picture.data.url,
          played: 0,
          won: 0
        };

        user = new User(userInfo);
        user.save(function (err) { if (err) return res.status(500); });
      }
      req.session.user = user;
      res.status(200).json({redirectTo: '/home'}).send();
    });
  },

  home: function (req, res) {
    if (!req.session.user) return homeRedirect(res);
    User.findOne({'id': req.session.user.id}, function (err, user) {
        if (user) {
          res.cookie('userId', user.id);
          return res.render('home', {user: user});
        }
        homeRedirect(res);
      });
    }
};