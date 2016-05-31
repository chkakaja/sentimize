import React from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';

export default class MainLayout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-layout">
        <h1><Link to="/">Sentimize</Link></h1>
        <Link to="/record">Record</Link>
        <Link to="/sessions">Sessions</Link>
        {this.props.children}
      </div>
    )
  }
}