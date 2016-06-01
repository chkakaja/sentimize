import React from 'react';
import ReactDom from 'react-dom';
import RecordBox from './record-box.jsx';
import RecordInstructions from './record-instructions.jsx';

export default class RecordView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="recordbox">
          <RecordBox/>
        </div>  
        <div className="recordinstructions">
          <RecordInstructions/>
        </div>
      </div>
    )
  }
}

