var env = require('./../../env/env-config.js');

var connection = {
  client: 'mysql',
  connection: {
    host: env.HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    charset: 'utf8'
  }
};

var knex = require('knex')(connection);

console.log('in db.js before raw');

knex.raw('CREATE DATABASE IF NOT EXISTS ' + env.APP_NAME)
  .then(function(){
    console.log('destroy connection');
    knex.destroy();
    connection.database = env.APP_NAME;

    knex = require('knex')(connection);
  })
  .catch(function(err) {
    console.error(err);
  });

var db = require('bookshelf')(knex);
console.log('db in db', db);
module.exports = db;

console.log('in db.js after raw');