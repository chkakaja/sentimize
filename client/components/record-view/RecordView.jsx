import React from 'react';
import ReactDom from 'react-dom';
import RecordInstructions from './record-instructions.jsx';
import FACE from '../../lib/FACE-1.0.js';
import API from './API_interaction.js';
import $ from 'jquery';
import reportView from '../report-view/ReportView.jsx';
import {Router, browserHistory} from 'react-router';

var recordInterval;

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

  startRecording() {

    $.ajax({
      type: 'POST',
      url: '/api/session',
      error: function() {
        console.log('error')
      },
      success: function(savedSession) {
        this.setState({
          sessionId: savedSession.id
        })

        this.startSnapshot()

      }.bind(this),
    });
  }

  startSnapshot() {
    var sessionId = this.state.sessionId;
    recordInterval = setInterval(function() {
      FACE.webcam.takePicture('webcam', 'current-snapshot');
      var snapshot = document.querySelector('#current-snapshot');
      API.sendDetectRequest(snapshot.src, sessionId);
    }.bind(this), 3000);
  }

  stopRecording() {
    clearInterval(recordInterval);
    //sends to report view, and pass along this.state.sessionId
    browserHistory.push('/reports/' + this.state.sessionId)
  }

  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-2-3 record-box">
          <video id='webcam' className="pure-u-1-1" autoplay></video>
          <div className="button-bar">
            <button className="record-button" onClick={this.startRecording.bind(this)}>Record</button>
            <button className="stop-button" onClick={this.stopRecording.bind(this)}>Stop</button>
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