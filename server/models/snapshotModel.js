var db = require('./config/db.js')

db.knex.schema.hasTable('snapshots').then(function(exists){
  if(!exists) {
    db.knex.schema.createTable('snapshots', function(snapshot) {
      snapshot.increments('id').primary();
      snapshot.integer('mood');
      snapshot.integer('gender-c');
      snapshot.string('gender-v', 1);
      snapshot.integer('age');
      snapshot.integer('ethnicity-c');
      snapshot.string('ethnicity-v', 50);
      snapshot.integer('sadness');
      snapshot.integer('anger');
      snapshot.integer('suprise');
      snapshot.integer('fear');
      snapshot.integer('happiness');
      snapshot.string('user_id')
        .unsigned()
        .references('id')
        .inTable('ssers');
      snapshot.string('session_id')
        .unsigned()
        .references('id')
        .inTable('sessions');
    }).then(function(){
      console.log("Snapshots table created")
    })
  }
});

var Snapshot = db.Model.extend({
  tableName: 'snapshots',
  hasTimestamps: true,
})

module.exports(Snapshot)