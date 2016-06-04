import FACE from '../../lib/FACE-1.0.js';
import env from '../../../env/client-config.js';
import $ from 'jquery';

var app_key = env.FACE_APP_KEY;
var client_id = env.FACE_CLIENT_ID;
var globalsessionId = null;

var success = function(result) {
  result.sessionId = globalsessionId

  $.ajax({
      type: 'POST',
      url: '/api/snapshot',
      data: result,
      error: function() {
        console.log('error')
      },
      success: function(savedSnapshot) {
      }
  });

};

var error = function(err) {
  console.error('error occured when image to API', err);
};

export default {
  sendDetectRequest: function(imgData, sessionId) {
    var imgBlob = FACE.util.dataURItoBlob(imgData);
    globalsessionId = sessionId;
    FACE.sendImage(imgBlob, success, error, app_key, client_id);

  }
};