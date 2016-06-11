User = require('../models/user');

module.exports = {
  create: function (req, res) {
    var userInfo = {
      username: "Paca21",
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
  }
};

