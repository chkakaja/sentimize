var User = require('../models/UserModel.js');
var Session = require('../models/SessionModel.js');
var Snapshot = require('../models/SnapshotModel.js');

// new Photo({id: 1}).fetch({
//   withRelated: ['account']
// }).then(function(photo) {
//   if (photo) {
//     var account = photo.related('account');
//     if (account.id) {
//        return account.related('trips').fetch();
//     }
//   }
// })


module.exports = function(app, passport) {

  app.post('/api/session',
   function(req, res) {
     var sessionObj = {}


    //need to gte current user
      //maybe in req.body (if we sent it along with the post req)
    //make sesssionObj with matching foreign key of userId
    return new Session(sessionObj).fetch({
      withRelated: ['user']
    }).save()
      .then(function(newSession) {
        console.log("coming back from saving in DB", newSession)
        res.status(302).send(newSession)
      })
      .catch(function(err) {
       console.log(err);
      })
  });

 

};