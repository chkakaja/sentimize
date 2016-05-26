module.exports = function(app, express) {
  // Pre-authentication routes
  app.get('/login',
  function(req, res) {
    res.render('login');
  });

  app.get('/signup',
  function(req, res) {
    res.render('signup');
  });

  app.get('/', 
  function(req, res) {
    res.render('index');
  });
};