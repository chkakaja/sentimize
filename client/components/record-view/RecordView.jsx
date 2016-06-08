import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory } from 'react-router';
import $ from 'jquery';
import Peer from 'peerjs';

import FACE from './../../lib/FACE-1.0.js';
import env from './../../../env/client-config.js';
import RecordInstructions from './RecordInstructions.jsx';
import RecordQuestions from './RecordQuestions.jsx';

export default class RecordView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: null,
      calledUserId: null,
      sessionId: null,
      intervalId: null,
      showQuestions: false,
      startTime: undefined,
    }
    this.peer = null;
    this.existingCall = null;
  }


  componentDidMount() {
    // FACE.webcam.startPlaying('webcam');
    this._getUserId();
  }


  _getUserId() {
    $.ajax({
      type: 'GET',
      url: '/api/users',
      success: function(currentUser) {
        this.setState({
          currentUserId: currentUser.id
        }, this._listenPeerConnection);
      }.bind(this),
      error: function(error) {
        console.error('Error getting user', error);
      }
    })
  }


  _listenPeerConnection() {
    // ************************************************************************ WHY IS THIS NOT WORKING

    console.log('CURRENT USER AFTER STATE CHANGE', this.state.currentUserId);

    this.peer = new Peer(this.state.currentUserId, {
      // host: process.env.HOST,
      // port: process.env.PORT_PEER,
      // path: '/peerjs',
      key: '9iht7nu2hv45nrk9',
      debug: 3
    });
    var video = document.querySelector('#webcam');
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    // Answer connection
    console.log('PEER', this.peer);
    this.peer.on('call', function(call) {
      console.log('called', call);
      navigator.getUserMedia({ video: true, audio: true }, function(stream) {
        // can prompt the user here if they want to answer or not
        call.answer(stream);
        call.on('stream', function(remoteStream) {
          video.src = window.URL.createObjectURL(stream);
          // HAVE IT SO THAT THEY CAN HANG UP THE CALL WHEN THEY CLICK ON A BUTTON
          this.existingCall = call;
          console.log('CREATED VIDEO', video);
          console.log('RECEIVED REMOTE STREAM', remoteStream);
        });
      }, function(error) {
        console.error('Failed to get local stream', error);
      });
    });
  }


  _callPeer() {
    var video = document.querySelector('#webcam');
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    console.log('CALLED USER AFTER STATE CHANGE', this.state.calledUserId);

    // Call connection
    navigator.getUserMedia({ video: true, audio: true }, function(stream) {
      var call = this.peer.call(this.state.calledUserId, stream);
      console.log('call', call);
      call.on('stream', function(remoteStream) {
        video.src = window.URL.createObjectURL(stream);
        console.log('CREATED VIDEO', video);
        console.log('RECEIVED REMOTE STREAM', remoteStream);
      })
    }.bind(this), function(error) {
      console.error('Failed to get local stream', error);
    });
  }


  _createNewSession(e) {
    var formData = {
      title: $('.record-title')[0].value,
      subject: $('.record-subject')[0].value,
      description: $('.record-description')[0].value
    };

    $.ajax({
      type: 'POST',
      url: '/api/session',
      data: formData,
      success: function(newSession) {
        console.log('New Session: ' + newSession.id);
        this.setState({
          sessionId: newSession.id
        }, function() {
          this._getCalledUser($('.record-called-user')[0].value);
        });

        this._startRecording();
        this._loadprompt();
      }.bind(this),
      error: function(error) {
        console.error('startRecording error', error)
      },
      dataType: 'json'
    });
  }


  _getCalledUser(email) {
    $.ajax({
      type: 'GET',
      url: '/api/users/getCalledUser',
      data: { email: email },
      dataType: 'json',
      success: function(calledUser) {
        this.setState({
          calledUserId: calledUser.id
        }, this._callPeer);
      }.bind(this),
      error: function(error) {
        console.error('Error getting called user', error);
      }
    });
  }


  _startRecording() {
    // ************************************************************************ PEER JS SHIT GOES HERE TOO
    var intervalId = setInterval(function() {
      FACE.webcam.takePicture('webcam', 'current-snapshot');
      this._takeSnapshot();
    }.bind(this), 1000);

    this.setState({ intervalId: intervalId, startTime: Date.now() });
  }


  _loadprompt() {
    $('.record-instructions').remove();
    this.setState({showQuestions: true});
  }


  _takeSnapshot() {
    var snapshot = document.querySelector('#current-snapshot');
    if( snapshot.naturalWidth == 0 ||  snapshot.naturalHeight == 0 ) return;

    // Process snapshot and make API call
    var snapshotBlob = FACE.util.dataURItoBlob(snapshot.src);
    var successCb = function(data) {
      console.log('DATA BEING TAKEN', data.persons[0]);
      this._createNewSnapshot(data.persons[0])
    }.bind(this);
    var errorCb = function(err) {
      console.error('_sendSnapshot error', err);
    }

    FACE.sendImage(
      snapshotBlob,
      successCb, errorCb,
      env.FACE_APP_KEY, env.FACE_CLIENT_ID
    );
  }


  _createNewSnapshot(snapshotData) {
    let sessionId = this.state.sessionId;

    $.ajax({
      method: 'POST',
      url: '/api/snapshot',
      data: {
        sessionId: sessionId,
        snapshotData: snapshotData
      },
      success: function(newSnapshot) {
        console.log('New snapshot created.', newSnapshot);
      },
      error: function(error) {
        console.error('_createNewSnapshot error', error);
      },
      dataType: 'json'
    });
  }


  _endSession() {
    // ************************************************************************ PEER JS SHIT GOES HERE TOO
    console.log('Session ended.');
    clearInterval(this.state.intervalId);
    this._calcDuration()
    this.existingCall.close();

    // Wait 2 seconds after stop button is pressed
    setTimeout(function() {
      FACE.webcam.stopPlaying('webcam');
      browserHistory.push('/reports/' + this.state.sessionId.toString());
    }.bind(this), 1000)
  }


  _calcDuration () {
    let sessionId = this.state.sessionId;

    if (this.state.startTime !== undefined) {
        var endTime = Date.now();
        var difference = endTime - this.state.startTime;
        difference = Math.round(difference/1000);
    }
    console.log(difference, 'this is the difference in seconds')
    //create ajax request to update /api/sessions of sessionId
    $.ajax({
      type: 'POST',
      url: '/api/session/update',
      data: {
        difference: difference,
        sessionId: sessionId
      },
      success: function(updatedSession) {
        console.log(updatedSession, 'UPDATED DURATION')
      }.bind(this),
      error: function(error) {
        console.error('_calcDuration error', error)
      },
      dataType: 'json'
    });
  }


  render() {
    return (
      <div className="pure-g record-container">
        <div className="pure-u-2-3 record-box">
          <video id='webcam' className="pure-u-1-1 record-webcam" autoplay></video>
          <img id='current-snapshot' src=''/>

        </div>
        <div className="pure-u-1-3 record-form">
          <RecordInstructions clicked={this._createNewSession.bind(this)}/>
          { this.state.showQuestions ? <RecordQuestions clicked={this._endSession.bind(this)}/> : null }
        </div>

      </div>
    )
  }
}

// <div className="pure-u-2-3 record-box">
//           <img className='pure-u-1-2' id='current-snapshot' src=''/>
//         </div>