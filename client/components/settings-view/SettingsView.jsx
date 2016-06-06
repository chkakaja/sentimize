import React from 'react';
import $ from 'jquery';

export default class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  }

  componentWillMount() {
    this._getCurrentUser(function(currentUser) {
      this.setState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        password: currentUser.password
      })
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
      }
    });
  }

  render() {
    return (
      <div className="view settings-view">
        <h4 className="settings-view-welcome">Profile Settings</h4>
        <h4 className="settings-view-instructions">Update your user settings below.</h4>
        <form method="PUT" action="/api/users">
          <div className="update-form-label">First Name</div>
          <div className="update-form-input firstname">
            <input type="text" name="firstname" placeholder="Update First Name" value={this.state.firstName} required></input>
          </div>
          <div className="update-form-label">Last Name</div>
          <div className="update-form-input lastname">
            <input type="text" name="lastname" placeholder="Update Last Name" value={this.state.lastName} required></input>
          </div>
          <div className="update-form-label">Email</div>
          <div className="update-form-input Email">
            <input type="text" name="Email" placeholder="Update Email" value={this.state.email} required></input>
          </div>
          <div className="update-form-label">Password</div>
          <div className="update-form-input password">
            <input type="password" name="password" placeholder="New Password" required></input>
          </div>
          <button className="update-button">Update Profile</button>
        </form>
      </div>
    )
  }
}