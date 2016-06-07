var db = require('../config/db');
var Snapshot = require('./SnapshotModel.js');
var Session = require('./SessionModel.js');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('email', 255).unique();
      user.string('password', 255);
      user.string('gender', 1);
      user.integer('age');
      user.string('ethnicity', 255);
      user.string('firstName', 255);
      user.string('lastName', 255);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  snapshots: function() {
    return this.hasMany(Snapshot);
  },
  sessions: function() {
    return this.hasMany(Session);
  },

  initialize: function() {
    this.on('creating', this.hashPassword);
  },

  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },

  hashPassword: function() {
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }

});

module.exports = User;