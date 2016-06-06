import React from 'react';
import ReactDom from 'react-dom';
import { browserHistory } from 'react-router';
import $ from 'jquery';

import FACE from './../../lib/FACE-1.0.js';
import env from './../../../env/client-config.js';
import RecordInstructions from './record-instructions.jsx';
import RecordQuestions from './record-questions.jsx';

export default class RecordView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: null,
      intervalId: null,
      showQuestions: false
    }
  }

  componentDidMount() {
    FACE.webcam.startPlaying('webcam');
  }

  _createNewSession(e) {
    var formData = {
     title: $('.record-title')[0].value,
     subject: $('.record-subject')[0].value,
     description: $('.record-description')[0].value
    }

    $.ajax({
      type: 'POST',
      url: '/api/session',
      data: formData,
      success: function(newSession) {
        console.log('New Session: ' + newSession.id);
        this.setState({
          sessionId: newSession.id
        });

        this._startRecording()
        this._loadprompt()
      }.bind(this),
      error: function(error) {
        console.error('startRecording error', error)
      },
      dataType: 'json'
    });
  }
  _loadprompt() {

    $('.record-instructions').remove()
    this.setState({showQuestions: true})


  }
  _startRecording() {
    var intervalId = setInterval(function() {
      FACE.webcam.takePicture('webcam', 'current-snapshot');
      this._takeSnapshot();
    }.bind(this), 3000);

    this.setState({ intervalId: intervalId });
  }

  _takeSnapshot() {
    var snapshot = document.querySelector('#current-snapshot');
    if( snapshot.naturalWidth == 0 ||  snapshot.naturalHeight == 0 ) return;

    // Process snapshot and make API call
    var snapshotBlob = FACE.util.dataURItoBlob(snapshot.src);
    var successCb = function(data) {
      // console.log(snapshotData.persons[0]);
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
    clearInterval(this.state.intervalId);

    // Wait 2 seconds after stop button is pressed
    setTimeout(function() {
      FACE.webcam.stopPlaying('webcam');
      browserHistory.push('/reports/' + this.state.sessionId.toString());
    }.bind(this), 2000)
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