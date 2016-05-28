var env = require('./../../env/env-config.js');

var connection = {
  client: 'mysql',
  connection: {
    host: env.HOST,
    database: env.APP_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    charset: 'utf8'
  }
};

var knex = require('knex')(connection);

connection.database = env.APP_NAME;
var db = require('bookshelf')(knex);
module.exports = db;