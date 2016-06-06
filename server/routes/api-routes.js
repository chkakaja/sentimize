var User = require('../models/UserModel.js');
var SessionController = require('./../controllers/SessionController.js');
var SnapshotController = require('./../controllers/SnapshotController.js');

module.exports = function(app) {
  app.get('/api/session',  SessionController.getSessions);
  app.post('/api/session', SessionController.createSession);
  app.post('/api/session/update', SessionController.updateSession);

  app.get('/api/snapshot', SnapshotController.getSnapshots);
  app.post('/api/snapshot', SnapshotController.createSnapshot);
};