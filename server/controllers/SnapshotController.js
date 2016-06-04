var Session = require('../models/SessionModel.js');
var Snapshot = require('../models/SnapshotModel.js');

module.exports = {
  createSnapshot: function(req, res) {
    console.log(req.body, 'THIS IS THE REQ BODY from controller')
    var data = req.body.persons[0] 
    
    var snapshotObj = {
      mood: null,
      'gender-c': data.gender.confidence,
      'gender-v': data.gender.value,
      age: data.age.value,
      'ethnicity-c': data.ethnicity.confidence,
      'ethnicity-v': data.ethnicity.value,
      sadness: data.expressions.sadness.value,
      anger: data.expressions.anger.value,
      surprise: data.expressions.surprise.value,
      fear: data.expressions.fear.value,
      happiness: data.expressions.happiness.value,
      disgust: data.expressions.disgust.value,
      userId: req.user.id, 
      sessionId: req.body.sessionId 
    }

    
    if (data.mood.value === 'Positive') {
        snapshotObj.mood = data.mood.confidence
    } else {
         snapshotObj.mood = -(data.mood.confidence) 
    }
    

    return new Snapshot(snapshotObj).save()
      .then(function(newSnapshot) {
        res.status(201).send(newSnapshot);
      })
      .catch(function(err) {
       console.log(err, 'THIS IS THE ERROR');
      });
  },

  getSession: function(req, res) {
    // sessionID is available in req.body
    var sessionId = req.param('id');
    Snapshot.where({sessionId: sessionId}).fetchAll()
      .then(function(snapshots) {
        if(!snapshots) {
          res.status(400)
        } else {
          console.log('found snapshots' , snapshots)
          res.status(200).send(snapshots)
        }
      })
      .catch(function(err) {
        console.log(err)
    })
  }
}
