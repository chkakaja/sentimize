var env = require('./../../env');

var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: 'sentimze_db',
    charset: 'utf8'
  }
});

var db = require('bookshelf')(knex);

module.exports = db;

