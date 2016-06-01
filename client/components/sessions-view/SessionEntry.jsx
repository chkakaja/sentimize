import React from 'react';

export default (props) => (
  <div className="session-entry">
    <h4> Session Entry </h4>
    <div>
      {props.content}
    </div>
  </div>
);