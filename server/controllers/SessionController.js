var Session = require('../models/SessionModel.js');
var moment = require('moment');

module.exports = {
  createSession: function(req, res) {
    // Dummy data for now in: title, description, subject, and duration
    console.log(req.data, 'REQ DATA')
    console.log(req.body, 'REQ BODY')
    var sessionObj = {
      userId: req.user.id,
      title: req.body.title,
      description: req.body.description,
      subject: req.body.subject,
      date: moment().format('MMMM Do YYYY, h:mm a'),
      duration: 'Temporary Duration'
    };

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
    };

    Session.where(queryObj).fetchAll()
      .then(function(sessions) {
        res.status(200).send(sessions);
      })
      .catch(function(err) {
        console.error(err);
      });
  },

  updateSession: function(req, res) {
    return Session.forge({id: req.body.sessionId})
      .fetch()
      .then(function(session) {
        session.save({
          duration: req.body.difference
        });
      })
      .then(function(updatedSession) {
        res.status(201).send(updatedSession)
      })
      .catch(function(err) {
        console.log('Error in updating session', err)
      })
  },
  
  sessionTranscript: function(req, res) {
    console.log('HERE____________', req.body.session)
    new Session({
      'id' : req.body.session
    }).save({
      'transcript': req.body.transcript
    }).then(function(session){
      res.send(201)
    })
  },
  
  loadSessionTranscript: function(req, res) {
    var parsedUrl = req.url.split('/');
    var queryObj = {
      id: parsedUrl[parsedUrl.length - 1]
    }
    Session.where(queryObj).fetch()
    .then(function(session) {
      res.status(200).send(session);
    })
    .catch(function(err) {
      console.error(err);
    })
  }
}