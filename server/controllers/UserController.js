var User = require('./../models/UserModel.js');

exports.createUser = function(req, res) {
  var userObj = {
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    email: req.body.email,
    password: req.body.password
  };

  User.where('email', userObj.email).fetch().then(function(user) {
    if(!user) {
      return new User(userObj).save();
    }
  }).then(function(newUser) {
    res.status(302).redirect('/login');
  })
  .catch(function(err) {
    console.log(err);
  })
};

exports.getCurrentUser = function(req, res) {
  User.where({ id: req.user.id }).fetch()
    .then(function(currentUser) {
      // Null out password before sending information
      currentUser.password = null;
      res.status(200).send(currentUser);
    })
    .catch(function(err) {
      console.error(err);
    })
};

exports.updateUser = function(req, res) {
  if (req.body.hasNewPassword === true) {
    setNewPassword(req, res);
  } else {
    updateUserProfile(req, res);
  }
};

var updateUserProfile = function(req, res) {
  var updatedUser = req.body;
  delete req.body.hasNewPassword;
  new User({ id: req.user.id }).save(updatedUser)
    .then(function(updatedUser) {
      res.status(200).send(updatedUser);
    })
    .catch(function(err) {
      console.error(err);
    })
};

var setNewPassword = function(req, res) {

};

