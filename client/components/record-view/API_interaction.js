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

    console.log('img data', imgData);
    console.log('img data type', typeof imgData);

    // var callback = function(blob) {
    //   console.log('img blob', blob);
    //   FACE.sendImage(blob, success, error, app_key);
    // };

    // FACE.util.resizeImage(imgData, callback, 400, 400);

    var imgBlob = FACE.util.dataURItoBlob(imgData);
    console.log('img blob', imgBlob);

    FACE.sendImage(imgBlob, success, error, app_key, client_id);

    FACE.sendUrl(imgData, success, error, app_key, client_id);

    // FACE.sendUrl('http://www.uni-regensburg.de/Fakultaeten/phil_Fak_II/Psychologie/Psy_II/beautycheck/english/durchschnittsgesichter/m(01-32)_gr.jpg', success, error, app_key, client_id);
  }
};