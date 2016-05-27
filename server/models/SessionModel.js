var db = require('../config/db');
var User = require('./UserModel');
var Snapshot = require('./SnapshotModel');

console.log('db', db);

db.knex.schema.hasTable('sessions').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('sessions', function(session) {
      session.increments('id').primary();
      session.integer('userId');
      session.timestamps();
    }).then(function() {
      console.log('Session Table created');
    })
  }
});

var Session = db.Model.extend({
  tableName: 'sessions',
  hasTimestamps: true,
  user: function() {
    return this.belongTo(User);
  },
  snapshots: function() {
    return this.hasMany(Snapshot);
  }
});

module.exports = User;