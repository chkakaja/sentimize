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

knex.raw('CREATE DATABASE IF NOT EXISTS ' + env.APP_NAME)
  .then(function(){
    knex.destroy();
    connection.database = env.APP_NAME;

    knex = require('knex')(connection);
  })
  .then(function() {
    var db = require('bookshelf')(knex);
    module.exports = db;
  })
  .catch(function(err) {
    console.error(err);
  });
