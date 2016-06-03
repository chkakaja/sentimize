var Session = require('../models/SessionModel.js');
var Snapshot = require('../models/SnapshotModel.js');

module.exports = {
  createSnapshot: function(req, res) {
    /*{
  "persons": [
    {
      "mood": {
        "confidence": 27,
        "value": "Positive"
      },
      "gender": {
        "confidence": 71,
        "value": "Male"
      },
      "age": {
        "range": 5,
        "value": 12
      },
      "expressions": {
        "sadness": {
          "value": 5
        },
        "neutral": {
          "value": 0
        },
        "disgust": {
          "value": 2
        },
        "anger": {
          "value": 2
        },
        "surprise": {
          "value": 2
        },
        "fear": {
          "value": 3
        },
        "happiness": {
          "value": 0
        }
      },
      "ethnicity": {
        "confidence": 41,
        "value": "Caucasian"
      }
    }
  ],
  "img_height": 480,
  "img_width": 640,
  "sessionId": sessionId
}*/
    console.log(req.body, "THIS IS THE REQ BODY from controller")
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
       console.log(err, "THIS IS THE ERROR");
      });
  }
}