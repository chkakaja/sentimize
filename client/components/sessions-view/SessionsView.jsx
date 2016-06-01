import React from 'react';
import SessionEntry from './SessionEntry.jsx';

export default class SessionsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testEntries: [
        {
          title: 'Entry1',
          description: 'content1',
          graph: 'graph1'
        },
        {
          title: 'Entry2',
          description: 'content2',
          graph: 'graph2'
        },
        {
          title: 'Entry3',
          description: 'content3',
          graph: 'graph3'
        }
      ]
    }
  }

  render() {
    return (
      <div className="view sessions-view">
        <h4>Sessions View!</h4>
          {this.state.testEntries.map(entry => <SessionEntry entry={entry}/>)}
      </div>
    )
  }
}