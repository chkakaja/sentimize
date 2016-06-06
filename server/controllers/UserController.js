var User = require('./../models/UserModel.js');

exports.createUser = function(req, res) {
  var userObj = {};
  userObj.username = req.body.username;
  userObj.password = req.body.password;
  User.where('username', userObj.username).fetch().then(function(user) {
    if(!user) {
      return new User(userObj).save();
    }
  }).then(function(newUser) {
    res.status(302).redirect('/');
  })
  .catch(function(err) {
    console.log(err);
  })
};