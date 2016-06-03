var Session = require('../models/SessionModel.js');

module.exports = {
  createSession: function(req, res) {
     var sessionObj = {
      userId: req.user.id 
     }

     console.log(req.user.id, "REQ user Id")
    //need to get current user
      //maybe in req.body (if we sent it along with the post req)
    //make sesssionObj with matching foreign key of userId
    return new Session(sessionObj).save()
      .then(function(newSession) {
        console.log("coming back from saving in DB", newSession)
        res.status(302).send(newSession)
      })
      .catch(function(err) {
       console.log(err);
      });
  }
}