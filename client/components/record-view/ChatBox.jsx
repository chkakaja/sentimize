import React from 'react';
import ReactDom from 'react-dom';
import { socket, join, sendMessage } from '../../Sockets.js';
import $ from 'jquery';
import Notes from './Notes.jsx'

export default class ChatBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			transcript: [],
      transcriptPart: '',
		};
    this.saveTranscript = this.saveTranscript.bind(this)
	}

	componentDidMount() {
	    join(1);
	};
 
  onTranscriptChange(e){
    this.setState({
      transcriptPart: e.target.value
    });
  }

  sendTranscript(){
    this.setState({ 
        transcript: this.state.transcript.concat([this.state.transcriptPart])
    })
    sendMessage(1, 1, this.state.transcript);
    this.setState({
      transcriptPart: ''
    })
  }

  saveTranscript(){
    console.log('---------------', this.props.currentSession)
    var formattedTran = this.state.transcript.join('+');
    console.log(formattedTran);
    $.ajax({
      method:'POST',
      url: '/transcript',
      data: {       
        session: this.props.currentSession,
        transcript: formattedTran,
      },
      success: function() {
        console.log('posted transcript');
      },
      error: function(error) {
        console.error('posting transcript error', error);
      },
      dataType: 'json'
    });
  }


	render(){
	  return (
			<div className="record-questions pure-u-1-1">
        <ul className="chatbox">
          {this.state.transcript.map(function(mes){
            return <li> {mes} </li>; 
          })}
        </ul>
        <div className="button-bar">        
            <input onChange={this.onTranscriptChange.bind(this)}
             type="text" value={this.state.transcriptPart}> 
            </input>
            <button onClick={this.sendTranscript.bind(this)} >send</button>
        </div>
		    <div className="button-bar">
          <button className="stop-button pure-button pure-button-error" 
          onClick={(e) => {this.saveTranscript(); 
            this.props.clicked(e)}}>Stop</button>
		    </div>
			</div>
		);
	};

}