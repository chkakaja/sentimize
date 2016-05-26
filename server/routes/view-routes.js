module.exports = function(app, express) {
  app.get('/', function(req, res) {
    res.render('index')
  })
}