import React from 'react';

//shorter version??
// export default (
//   <div>
//     Session Entry
//     {this.props.content}
//   </div>
// );

export default class SessionEntry extends React.Component {
  render() {
    return <div>
      <h4> Session Entry </h4>
      <div>
        {this.props.content}
      </div>
    </div>
  }
}