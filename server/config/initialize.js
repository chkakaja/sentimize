var morgan = require('morgan');
var jade = require('jade').__express;


module.exports = function(app, express) {
  app.use(morgan('dev'));
  app.use(express.static(__dirname + './../../client'));

  app.engine('jade', jade);
  app.set('view engine', 'jade');
  app.set('views', __dirname + './../views');
}