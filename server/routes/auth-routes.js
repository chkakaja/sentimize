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

  app.get('/signup',
  function(req, res) {
    res.render('signup');
  });

};