import React from 'react';
import { browserHistory } from 'react-router';

export default class SessionEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  showSessionReport() {
    browserHistory.push('/reports/' + this.props.sessionId.toString());
  }

  render() {
    return (
      <div className="session-entry-block" onClick={this.showSessionReport.bind(this)}>
        <div className="session-entry-title">{this.props.entry.title}</div>
        <div className="session-entry-description">{this.props.entry.description}</div>
        <div className="session-entry-subject">
          <span className="label">Subject: </span>
          <span className="value">{this.props.entry.subject}</span>
        </div>
        <div className="session-entry-date">
          <span className="label">Date: </span>
          <span className="value">{this.props.entry.date}</span>
        </div>
        <div className="session-entry-duration">
          <span className="label">Duration: </span>
          <span className="value">{this.props.entry.duration}</span>
        </div>
      </div>
    )
  }
};