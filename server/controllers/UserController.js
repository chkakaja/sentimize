var User = require('./../models/UserModel.js');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

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
  if (req.body.hasNewPassword === 'true') {
    setNewPassword(req, res);
  } else if (req.body.hasNewPassword === 'false') {
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
  User.where({ id: req.user.id }).fetch()
    .then(function(currentUser) {
      currentUser.comparePassword(req.body.currentPassword, function(isMatch) {
        if (!isMatch) {
          res.status(401).send({ message: 'Incorrect password.' });
        } else {
          Promise.promisify(bcrypt.hash)(req.body.newPassword, null, null)
            .then(function(hashedPassword) {
              return new User({ id: req.user.id }).save({ password: hashedPassword });
            })
            .then(function(updatedUser) {
              updatedUser.hashPassword();
              res.status(200).send(updatedUser);
            })
            .catch(function(err) {
              console.error(err);
            })
        }
      });
    })
    .catch(function(err) {
      console.error(err);
    })
};

