import FACE from '../../lib/FACE-1.0.js';
import env from '../../../env/client-config.js';

var app_key = env.FACE_APP_KEY;
var client_id = env.FACE_CLIENT_ID;

var success = function(result) {
  console.log('data returned from API', result);
};

var error = function(err) {
  console.error('error occured when image to API', err);
};

export default {
  sendDetectRequest: function(imgData) {
    var imgBlob = FACE.util.dataURItoBlob(imgData);
    FACE.sendImage(imgBlob, success, error, app_key, client_id);

  }
};