import React from 'react';
import ReactDom from 'react-dom';


export default (props) => (
	<div className="record-questions pure-u-1-1">
		<h1>Questions</h1>
      <ul>
	      <li>Introduce yourself within 30 seconds.</li>
	      <li>Tell us about a challenge you recently faced and how you resolved it.</li>
	      <li>What are your strengths and weaknesses?</li>
     </ul>
     <div className="button-bar">
        <button className="stop-button pure-button pure-button-error" onClick={(e) => props.clicked(e)}>Stop</button>
    </div>
	</div>
)