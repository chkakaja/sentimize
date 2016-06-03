import React from 'react';
import ReactDom from 'react-dom';
import RecordInstructions from './record-instructions.jsx';
import Webcam from 'react-webcam';
// import API from './API_interaction.js';
import $ from 'jquery';

export default class RecordView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: null,
      sessionId: null
    }
  }

  startSession() {
    // $.post('/api/session',/*{SEND IN USER data if we have},*/ function(savedSession) {
    //   console.log(savedSession, "comingback from server savedSession")
    //   this.setState({
    //     sessionId: savedSession.id
    //   })
    // })

    $.ajax({
      type: 'POST',
      url: '/api/session',
      error: function() {
        console.log('error')
      },
      success: function(savedSession) {
        console.log(savedSession);
        this.setState({
          sessionId: savedSession.id
        })
      }.bind(this),
    });

  }

  takeScreenshot() {
    this.setState({
      screenshot: this.refs.webcam.getScreenshot()
    });
    API.sendDetectRequest(this.refs.webcam.getScreenshot());
    // console.log('Screenshot data', this.refs.webcam.getScreenshot());
  }

  render() {
    return (
      <div className="pure-g">
        <div className="pure-u-1-2 record-box">
          <Webcam className="pure-u-1-1" ref='webcam'/>
          <div className="button-bar">
            <button className="screenshot-button" onClick={this.takeScreenshot.bind(this)}>Capture Screenshot</button>

            <button onClick={this.startSession.bind(this)} className="record-button">Record</button>
            <button className="stop-button">Stop</button>
          </div>
          <img src={this.state.screenshot} id='screenshot'/>
        </div>
        <div className="pure-u-1-2">
          <RecordInstructions/>
        </div>
      </div>
    )
  }
}