var env = require('./../env/env-config');
var util = require('./lib/utility.js')

var express = require('express');
var passport = require('passport');

var app = express();

// Initial Configuration, Static Assets, & View Engine Configuration
require('./config/initialize.js')(app, express);
// Authentication Middleware: Express Sessions, Passport Strategy
require('./config/auth.js')(app, express, passport);


// Pre-Authentication Routes & OAuth Requests
require('./routes/auth-routes.js')(app, passport);

app.use(util.ensureAuthenticated);

// View Routes
require('./routes/view-routes.js')(app);
// API Routes
// require('./routes/api-routes.js')(app);

// Wildcard route
app.get('/*', function(req, res) {
  res.redirect('/');
})

app.listen(env.PORT, env.HOST, function() {
  console.log(env.APP_NAME + ' is listening at ' + env.HOST + ' on port ' + env.PORT + '.')
});