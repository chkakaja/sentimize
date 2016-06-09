var db = require('../config/db');
var User = require('./UserModel');
var Snapshot = require('./SnapshotModel');

db.knex.schema.hasTable('sessions').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('sessions', function(session) {
      session.increments('id').primary();
      session.integer('userId');
      session.string('title');
      session.string('description');
      session.string('transcript');
      session.string('subject');
      session.string('date');
      session.string('duration');
      session.string('notes');
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
    return this.belongTo(User, 'userId');
  },
  snapshots: function() {
    return this.hasMany(Snapshot);
  }
});

module.exports = Session;