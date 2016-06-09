import React from 'react';


export default class Notes extends React.Component {
	changetoggle(){
		this.props.toggle();
	}

	render(){
	  return (
			<div className="record-questions pure-u-1-1">
        <div className="chatbox">
        this space will have Notes
        </div>
		     <div className="button-bar">
            <button className="stop-button pure-button pure-button-error" 
            onClick={changetoggle()}>Notes</button>
            { this.state.showNotes ? <Notes clicked={this._endSession.bind(this)}/> : null }
            



            <button className="stop-button pure-button pure-button-error" 
            onClick={(e) => this.props.clicked(e)}>Stop</button>
		    </div>
			</div>
		);
	};
}