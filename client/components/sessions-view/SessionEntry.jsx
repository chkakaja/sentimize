import React from 'react';

export default (props) => (
  <div className="session-entry">
    <h4> {props.entry.title} </h4>
    <div>
      {props.entry.description}
    </div>
    <div>
      {props.entry.graph}
    </div>
  </div>
);