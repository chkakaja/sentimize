import React from 'react';
import Webcam from 'react-webcam';

export default (props) => (
  <div>
    <h4>Video</h4>
    <div>
      <Webcam />
      <div className="button-bar">
        <button className="record-button">Record</button>
        <button className="stop-button">Stop</button>
      </div>
    </div>
  </div>
);