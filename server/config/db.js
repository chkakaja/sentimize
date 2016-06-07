var connection = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    database: process.env.APP_NAME,
    user: process.env.DB_USER,
    password: '',
    charset: 'utf8'
  }
};

var knex = require('knex')(connection);

connection.database = process.env.APP_NAME;
var db = require('bookshelf')(knex);
module.exports = db;