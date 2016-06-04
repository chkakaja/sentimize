import React from 'react';
import ReactDom from 'react-dom';
import { broserHistory } from 'react-router';
import $ from 'jquery';

import FACE from './../../lib/FACE-1.0.js';
import env from './../../../env/client-config.js';
import RecordInstructions from './record-instructions.jsx';

export default class RecordView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionId: null
    }
  }

  componentDidMount() {
    FACE.webcam.startPlaying('webcam');
  }

  _createNewSession() {
    $.ajax({
      type: 'POST',
      url: '/api/session',
      success: function(newSession) {
        console.log('New Session: ' + newSession.id);
        this.setState({
          sessionId: newSession.id
        });

        this._startRecording()
      }.bind(this),
      error: function(error) {
        console.error('startRecording error', error)
      },
      dataType: 'json'
    });
  }

  _startRecording() {
    setInterval(function() {
      FACE.webcam.takePicture('webcam', 'current-snapshot');
      this._takeSnapshot();
    }.bind(this), 3000);
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
      env.APP_KEY, env.CLIENT_ID
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

  _stopRecording() {
    // Route to report view
    browserHistory.push('/reports/' + this.state.sessionId.toString());
  }

  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-2-3 record-box">
          <video id='webcam' className="pure-u-1-1" autoplay></video>
          <div className="button-bar">
            <button className="record-button" onClick={this._createNewSession.bind(this)}>Record</button>
            <button className="stop-button" onClick={this._stopRecording.bind(this)}>Stop</button>
          </div>
          <img id='current-snapshot' src=''/>
        </div>
        <div className="pure-u-1-3">
          <RecordInstructions/>
        </div>
      </div>
    )
  }
}