// request-promise is just like the HTTP client 'Request', except Promises-compliant.
// See https://www.npmjs.com/package/request-promise.
var requestPromise = require('request-promise');
var request = require('request');
var expect = require('chai').expect;

var db = require('./../server/config/db');
var env = require('./../env/env-config');
var appUrl = env.PROTOCOL + env.HOST + ':' + env.PORT;

describe('Sentimize - Server', function() {

  describe('Privileged Access', function(){
    beforeEach(function() {
      // Logout the user before each authentication test
      request(appUrl + '/logout', function(err, res, body) {});
    });

    it('Redirects to login page when an unauthenticated user tries to access the main page', function(done) {
      request(appUrl + '/', function(error, res, body) {
        // res comes from the request module, and may not follow express conventions
        expect(res.statusCode).to.equal(200);
        expect(res.req.path).to.equal('/login');
        done();
      });
    });

  });

});