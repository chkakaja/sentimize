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
      calledUserPeerId: null,
      sessionId: null,
      intervalId: null,
      showQuestions: false,
      startTime: undefined,
      peer: new Peer({ key: '9iht7nu2hv45nrk9', debug: 3 }),
      role: null
    }
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
        }, this._listenPeerConnection.bind(this));
      }.bind(this),
      error: function(error) {
        console.error('Error getting user', error);
      }
    })
  }


  _listenPeerConnection() {
    var video = document.querySelector('#webcam');
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    var currId = this.state.currentUserId;
    this.state.peer.on('open', function(id) {
      $.ajax({
        method: 'POST',
        url: '/api/users/updatePeerId',
        data: {
          id: currId,
          peerId: id
        },
        dataType: 'json',
        success: function(data) {
          console.log('Updated user peer id', data.peerId);
        }
      });
    });

    var calledGenerateSession = this._calledGenerateSession.bind(this);
    var startRecording = this._startRecording.bind(this);
    var loadPrompt = this._loadPrompt.bind(this);
    var currId = this.state.currentUserId;

    // Answer connection
    this.state.peer.on('call', (call) => {
      console.log('called', call);
      navigator.getUserMedia({ video: true, audio: true }, (stream) => {
        // can prompt the user here if they want to answer or not
        call.answer(stream);
        call.on('stream', (remoteStream) => {
          // find way to check state to see if they are interviewee or not - if they are, generate session
          var role = calledGenerateSession();
          console.log('CALLED USER', role);
          if (role === 'Interviewee') {
            console.log('STARTED RECORDING');
            startRecording();
          }
          loadPrompt();

          video.src = window.URL.createObjectURL(stream);
          window.existingCall = call;
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

    var startRecording = this._startRecording.bind(this);
    var loadPrompt = this._loadPrompt.bind(this);
    var role = this.state.role;

    // Call connection
    navigator.getUserMedia({ video: true, audio: true }, function(stream) {
      var call = this.state.peer.call(this.state.calledUserPeerId, stream);
      console.log('call', call);
      call.on('stream', function(remoteStream) {
        console.log('CALLING USER', role);
        if (role === 'Interviewee') {
          console.log('STARTED RECORDING');
          startRecording();
        }
        loadPrompt();
        video.src = window.URL.createObjectURL(stream);
        window.existingCall = call;
        console.log('CREATED VIDEO', video);
        console.log('RECEIVED REMOTE STREAM', remoteStream);
      })
    }.bind(this), function(error) {
      console.error('Failed to get local stream', error);
    });
  }


  _createNewSession(e) {
    this.setState({
      role: $('.record-role')[0].value
    }, function() {
      this._getCalledUser($('.record-called-user')[0].value, function() {
        var formData = {
          title: $('.record-title')[0].value,
          subject: $('.record-subject')[0].value,
          description: $('.record-description')[0].value,
        };
        // console.log('WITHIN CREATE NEW SESSION', this.state.role)
        if (this.state.role === 'Interviewer') {
          formData.interviewerId = this.state.currentUserId;
          formData.intervieweeId = this.state.calledUserId;
        } else {
          formData.intervieweeId = this.state.currentUserId;
          formData.interviewerId = this.state.calledUserId;
        }
        // console.log('SUBMITTED FORM', formData);

        $.ajax({
          type: 'POST',
          url: '/api/session',
          data: formData,
          success: function(newSession) {
            console.log('New Session: ' + newSession.id);
            this.setState({
              sessionId: newSession.id
            }, this._callPeer.bind(this));
          }.bind(this),
          error: function(error) {
            console.error('startRecording error', error)
          },
          dataType: 'json'
        });
      });
    }.bind(this));

  }


  _calledGenerateSession() {
    $.ajax({
        type: 'GET',
        url: '/api/session/calledGenerateSession',
        async: false,
        data: { id: this.state.currentUserId },
        success: function(newSession) {
          console.log('session being created', newSession);
          console.log('current user', this.state.currentUserId);
          if (newSession.interviewerId === this.state.currentUserId) {
            var role = 'Interviewer';
          } else {
            var role = 'Interviewee';
          }
          this.setState({
            sessionId: newSession.id,
            role: role
          }, () => console.log('role after success', this.state.role));
        }.bind(this),
        error: function(error) {
          console.error('calledGenerateSession error', error)
        },
        dataType: 'json'
      });
    return this.state.role;
  }


  _getCalledUser(email, cb) {
    $.ajax({
      type: 'GET',
      url: '/api/users/getCalledUser',
      data: { email: email },
      dataType: 'json',
      success: function(calledUser) {
        this.setState({
          calledUserPeerId: calledUser.peerId,
          calledUserId: calledUser.id
        }, cb);
      }.bind(this),
      error: function(error) {
        console.error('Error getting called user', error);
      }
    });
  }


  _startRecording() {
    var intervalId = setInterval(function() {
      FACE.webcam.takePicture('webcam', 'current-snapshot');
      this._takeSnapshot();
    }.bind(this), 2000);

    this.setState({ intervalId: intervalId, startTime: Date.now() });
  }


  _loadPrompt() {
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
    console.log('Session ended.');
    window.existingCall.close();
    if (this.state.role === 'Interviewee') {
      clearInterval(this.state.intervalId);
      this._calcDuration();

      // Wait 2 seconds after stop button is pressed
      setTimeout(function() {
        FACE.webcam.stopPlaying('webcam');
      }.bind(this), 2000)
    }
    browserHistory.push('/reports/' + this.state.sessionId.toString());
  }


  _calcDuration () {
    let sessionId = this.state.sessionId;

    if (this.state.startTime !== undefined) {
        var endTime = Date.now();
        var difference = endTime - this.state.startTime;
        difference = Math.round(difference/1000);
    }
    console.log(difference, 'this is the difference in seconds')
    // create ajax request to update /api/sessions of sessionId
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