module.exports = function(app, express) {
  // Pre-authentication routes
  app.get('/login',
  function(req, res) {
    res.render('login');
  });

  app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  app.post('/api/users',
   function(req, res) {
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
  });

  app.get('/signup',
  function(req, res) {
    res.render('signup');
  });

  app.get('/logout',
  function(req, res) {
    req.logout();
    res.redirect('/login')
  });
  
};