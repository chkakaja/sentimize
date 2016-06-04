var Snapshot = require('../models/SnapshotModel.js');

module.exports = {
  createSnapshot: function(req, res) {
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

  getSnapshots: function(req, res) {
    var queryObj = {
      sessionId: req.param('sessionId')
    }

    Snapshot.forge(queryObj).fetchAll()
      .then(function(snapshots) {
        res.status(200).send(snapshots);
      })
      .catch(function(err) {
        console.error(err);
      });
  }
}
