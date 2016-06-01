import React from 'react';
import SessionEntry from './SessionEntry.jsx';

export default class SessionsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testEntries: [
        'entry1 content',
        'entry2 content',
        'entry3 content'
      ]
    }
  }

  render() {
    return (
      <div className="view sessions-view">
        <h4>Sessions View!</h4>
          {this.state.testEntries.map(entry => <SessionEntry content={entry}/>)}
      </div>
    )
  }
}