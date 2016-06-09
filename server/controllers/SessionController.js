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
    // something wrong here
    Session.where({ intervieweeId: req.query.id }).fetchAll()
      .then(function(intervieweeSessions) {
        Session.where({ interviewerId: req.query.id }).fetchAll()
          .then(function(interviewerSessions) {
            // FIND A WAY TO GET THIS DONE
            var lastInterviewerSession = interviewerSessions._byId[Object.keys(interviewerSessions._byId)[(Object.keys(interviewerSessions._byId).length) / 2 - 1]];
            var lastIntervieweeSession = intervieweeSessions._byId[Object.keys(intervieweeSessions._byId)[(Object.keys(intervieweeSessions._byId).length) / 2 - 1]];
            console.log('INTERVIEWER', lastInterviewerSession);
            console.log('interviewee', lastIntervieweeSession);
            if (lastInterviewerSession.attributes.id > lastIntervieweeSession.attributes.id) {
              res.status(200).send(lastInterviewerSession);
            } else {
              res.status(200).send(lastIntervieweeSession);
            }
            res.send();
          })
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