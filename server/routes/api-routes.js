var User = require('../models/UserModel.js');
var SessionController = require('./../controllers/SessionController.js');
var SnapshotController = require('./../controllers/SnapshotController.js');

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
  app.post('/api/snapshot', SnapshotController.createSnapshot);
};