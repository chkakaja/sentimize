var Session = require('../models/SessionModel.js');
var moment = require('moment');

module.exports = {
  createSession: function(req, res) {
    // Dummy data for now in: title, description, subject, and duration
    var sessionObj = {
      userId: req.user.id,
      title: 'Temporary Title',
      description: 'Temporary Description',
      subject: 'Temporary Subject',
      date: moment().format('MMMM Do YYYY, h:mm a'),
      duration: 'Temporary Duration'
    }

    return new Session(sessionObj).save()
      .then(function(newSession) {
        res.status(201).send(newSession);
      })
      .catch(function(err) {
       console.log(err);
      });
  },

  getSessions: function(req, res) {
    var queryObj = {
      userId: req.user.id
    }

    Session.where(queryObj).fetchAll()
      .then(function(sessions) {
        // console.log(sessions);
        res.status(200).send(sessions);
      })
      .catch(function(err) {
        console.error(err);
      })
  }
}