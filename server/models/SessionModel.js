var db = require('./db');

db.knex.schema.hasTable('sessions').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('sessions', function(session) {
      session.increments('id').primary();
      session.timestamps();
    }).then(function() {
      console.log('Session Table created');
    })
  }
});

var Session = db.Model.extend({
  tableName: 'sessions',
  hasTimestamps: true
});

module.exports(User);