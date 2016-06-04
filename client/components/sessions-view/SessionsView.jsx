import React from 'react';
import SessionEntry from './SessionEntry.jsx';

import sessionDummyData from './../../../data/session-data.json';

export default class SessionsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testEntries: sessionDummyData
    }
  }

  render() {
    return (
      <div className="view sessions-view">
        <h4 className="sessions-view-title">All Recorded Sessions</h4>
        {this.state.testEntries.map(entry => <SessionEntry key={entry.id} entry={entry}/>)}
      </div>
    )
  }
}