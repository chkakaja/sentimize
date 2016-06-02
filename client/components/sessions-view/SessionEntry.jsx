import React from 'react';

export default (props) => (
  <div className="session-entry">
    <img src='http://img.ifcdn.com/images/809939206545a9965086a346d92f688988e487b79577a2914696479d32604ca2_1.jpg'></img>
    <div className="session-entry-data">
      <h4> {props.entry.title} </h4>
      <div>
        {props.entry.description}
      </div>
      <div>
        {props.entry.graph}
      </div>
    </div>
  </div>
);