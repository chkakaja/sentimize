import React from 'react';
import ReactDom from 'react-dom';


export default (props) => (
  <div className="record-instructions pure-u-1-1">
    <h2> Session Info </h2>
    	<form action='' className="pure-form">
  	    <fieldset id="pure-form-group" className="pure-group">
          <input type='text' name='called-user' className='record-called-user record-form-input pure-input-1-2' placeholder='Email of user you want to call'></input>
          <input type="text"  name='title' className="record-title record-form-input pure-input-1-2" placeholder="Title"></input>
          <input type="text"  name='subject' className="record-subject record-form-input pure-input-1-2" placeholder="Subject"></input>
          <textarea name='description' className="record-description record-form-input pure-input-1-2" placeholder="Description"></textarea>
          <select type='text' name='role' className='record-role'>
            <option>Interviewer</option>
            <option>Interviewee</option>
          </select>
  	    </fieldset>

  	    <button type='button' onClick={(e) => props.clicked(e)} className="record-form-button pure-button pure-input-1-2 pure-button-primary">Start Recording</button>
  		</form>
  </div>
);