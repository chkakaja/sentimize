import FACE from '../../lib/FACE-1.0.js';

var app_key = '565337c2e5dd42b69643c676e8927869';

var success = function(result) {
  console.log('data returned from API', result);
};

var error = function(err) {
  console.error('error occured when image to API', err);
};

export default {
  testFct: function(message) {
    console.log('logged from API module', message);
    console.log('FACE', FACE);
  },

  sendDetectRequest: function(imgData) {
    var imgBlob = FACE.util.dataURItoBlob(imgData);
    console.log('image data to send', imgBlob);
    FACE.sendImage(imgBlob, success, error, app_key);
  }
};