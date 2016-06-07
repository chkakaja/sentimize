var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/UserModel.js');

module.exports = function(app, express, passport) {
  app.use(session({
    name: 'sentimize',
    secret: 'chkakaja',
  }))

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      User.where('email', email).fetch().then(function(user){
        if(!user) {
          return done(null, false, {message: 'Incorrect email.'});
        } else {
          user.comparePassword(password, function(passwordCorrect) {
            if (!passwordCorrect) {
              return done(null, false, {message: 'Incorrect password.'});
            } else {
              console.log('successfully logged in', email);
              return done(null, user);
            }
          });
        }
      })
      .catch(function(err) {
        console.error(err);
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.where('id', id).fetch().then(function(user) {
      done(null, user);
    })
    .catch(function(err) {
      console.error(err);
    })
  });
}
