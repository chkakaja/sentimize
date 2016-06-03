import React from 'react';
import ReactDom from 'react-dom';
import RecordBox from './record-box.jsx';
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
      success: function(data) {
        console.log(savedSession, "comingback from server savedSession")
        this.setState({
          sessionId: savedSession.id
        })
       },
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
          <form method="post" action="https://api.sightcorp.com/api/detect/"
                enctype="multipart/form-data">
            <input type="text" name="app_key" value="565337c2e5dd42b69643c676e8927869"/>
            <input type="text" name="client_id" value="d30d8accb4c84aa69e3af0eb878df592"/>
            <input type="text" name="attribute" value="age,gender"/>
            <input type="file" name="img"/>
            <input type="submit"/>
          </form>
        </div>

      </div>
    )
  }
}