var request = require('supertest');
var expect = require('chai').expect;

require('./setup.js');
var db = require('./../../server/config/db');
var appUrl = process.env.PROTOCOL + process.env.HOST + ':' + process.env.PORT;

request = request(appUrl);

describe('Express Server', function() {

  describe('Basic GET request', function() {
    it('returns 302 statusCode for redirection', function(done) {
      request.get('/').expect(302)
      .end(function(err) {
        if (err) return done(err);
        done();
      })
    })
  })

  describe('Authentication', function() {
    beforeEach(function() {
      // Logout the user before each authentication test
      request.get('/logout', function(err, res, body) {});
    });
    describe('Privileged Access', function() {
      it('redirects to welcome page when an unauthenticated user tries to access the main page', function(done) {
        request.get('/')
          .expect(302)
          .expect('Location', '/welcome')
          .end(function(err) {
            if (err) return done(err);
            done();
          });
      });
    });

    describe('User signup and login', function() {
      it('Signup a new user', function(done) {
        //to be fully implemented
        done();
      });
      it('Login with the same username and password combination', function(done) {
        //to be fully implemented
        done();
      });
    });

  });

  describe('Session API interaction', function() {
    it('GET /api/session', function(done) {
      //to be fully implemented
      done();
    });
    it('POST /api/session', function(done) {
      //to be fully implemented
      done();
    })
  });

  describe('Snapshot API interaction', function() {
    it('GET /api/snapshot', function(done) {
      //to be fully implemented
      done();
    });
    it('POST /api/snapshot', function(done) {
      //to be fully implemented
      done();
    })
  });




  // describe 'User authentication', ->
  //   describe 'POST /sessions', ->
  //     describe 'success', ->
  //       it 'redirects to the right path', (done) ->
  //         request
  //           .post(/login)
  //           .send('')
  //           .end(done)

});