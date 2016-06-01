import React from 'react';
import ReactDom from 'react-dom';
import RecordBox from './record-box.jsx';
import RecordInstructions from './record-instructions.jsx';
import Webcam from 'react-webcam';
// import FACE from './FACE-1.0.js';

export default class RecordView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screenshot: null
    }
  }

  takeScreenshot() {
    this.setState({
      screenshot: this.refs.webcam.getScreenshot()
    });
    console.log('Screenshot data', this.refs.webcam.getScreenshot());
  }

  render() {
    return (
      <div>
        <div className="record-box">
          <Webcam ref='webcam'/>
          <div className="button-bar">
            <button className="screenshot-button" onClick={this.takeScreenshot.bind(this)}>Capture Screenshot</button>

            <button className="record-button">Record</button>
            <button className="stop-button">Stop</button>
          </div>
          <img src={this.state.screenshot} />
        </div>
        <div className="recordinstructions">
          <RecordInstructions/>
        </div>
      </div>
    )
  }
}

