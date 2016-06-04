import React from 'react';
import SessionEntry from './SessionEntry.jsx';
import { browserHistory } from 'react-router';
import $ from 'jquery';

// import dummyData from './../../../data/session-data.json';

export default class SessionsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionEntries: []
    }
  }

  componentDidMount() {
    this._getSessions(function(data) {
      this.setState({ sessionEntries: data });
    }.bind(this));
  }

  _getSessions(callback) {
    $.ajax({
      method: 'GET',
      url: '/api/session',
      success: function(data) {
        callback(data);
      },
      error: function(error) {
        console.error('_getSessions Error:', error);
      },
      dataType: 'json'
    });
  }

  render() {
    return (
      <div className="view sessions-view">
        <h4 className="sessions-view-title">My Sessions</h4>
        <div className="pure-g">
          {this.state.sessionEntries.map(
            entry => (
              <div className="pure-u-1-3">
                <SessionEntry entry={entry} sessionId={entry.id} />
              </div>
            )
          )}
        </div>
      </div>
    )
  }
}