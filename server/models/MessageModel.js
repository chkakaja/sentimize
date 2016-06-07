var db = require('../config/db');


db.knex.schema.hasTable('messages').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('messages', function (message) {
      message.increments('id').primary();
      message.integer('sender');
      message.integer('receiver');
      message.string('message', 5000);
      message.timestamps();
    }).then(function (table) {
      console.log('Created Table messages:', table);
    });
  }
});


var Message = db.Model.extend({
  tableName:'message',
  hastimestamps: true

});


module.exports = Message;