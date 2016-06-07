import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

export default class HomeView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this._getCurrentUser(function(currentUser) {
      $(this.refs.firstName).text(currentUser.firstName);
    }.bind(this));
  }

  _getCurrentUser(callback) {
    $.ajax({
      method: 'GET',
      url: '/api/users',
      success: function(data) {
        // console.log(data);
        callback(data);
      },
      error: function(err) {
        console.error('_getCurrentUser error', err);
      },
      dataType: 'json'
    });
  }

  render() {
    return (
      <div className="view home-view">
        <div className="home-view-message">Hello, <span ref="firstName"></span>.</div>
        <h4 className="home-view-welcome">Welcome to sentimize.</h4>
        <div className="home-view-instruction">To begin a new video session, click on <span className="instruction-highlight"><Link to="/record">Record</Link></span>.</div>
        <div className="home-view-instruction">To see reports for all past sessions, click on <span className="instruction-highlight"><Link to="/sessions">Sessions</Link></span>.</div>
        <div className="home-view-instruction"></div>
      </div>
    )
  }
}