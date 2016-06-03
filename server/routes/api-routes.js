var User = require('../models/UserModel.js');
var SessionController = require('./../controllers/SessionController.js');

// new Photo({id: 1}).fetch({
//   withRelated: ['account']
// }).then(function(photo) {
//   if (photo) {
//     var account = photo.related('account');
//     if (account.id) {
//        return account.related('trips').fetch();
//     }
//   }
// })


module.exports = function(app, passport) {
  app.post('/api/session', SessionController.createSession);
};