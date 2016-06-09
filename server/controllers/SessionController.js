var Session = require('../models/SessionModel.js');
var moment = require('moment');

module.exports = {
  createSession: function(req, res) {
    // Dummy data for now in: title, description, subject, and duration
    console.log(req.data, 'REQ DATA')
    console.log(req.body, 'REQ BODY')
    var sessionObj = {
      intervieweeId: req.body.intervieweeId,
      interviewerId: req.body.interviewerId,
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

  getInterviewerSessions: function(req, res) {
    Session.where({ interviewerId: req.user.id }).fetchAll()
      .then(function(sessions) {
        res.status(200).send(sessions);
      })
      .catch(function(err) {
        console.error(err);
      });
  },

  getIntervieweeSessions: function(req, res) {
    Session.where({ intervieweeId: req.user.id }).fetchAll()
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
      });
  },

  calledGenerateSession: function(req, res) {
    Session.where({ intervieweeId: req.query.id }).fetchAll()
      .then(function(sessions) {
        res.status(200).send(sessions._byId[sessions.length - 1]);
      })
      .catch(function(err) {
        console.error(err);
      });
  },
  
  sessionTranscript: function(req, res){
    new Session({
      'id' : req.body.sender
    }).save({
      'transcript': req.body.transcript
    }).then(function(session){
      res.send(201)
    })
  }
}