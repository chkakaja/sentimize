import React from 'react';
import $ from 'jquery';

export default class SettingsView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this._getCurrentUser(function(currentUser) {
      this.refs.firstName.value = currentUser.firstName;
      this.refs.lastName.value = currentUser.lastName;
      this.refs.email.value = currentUser.email;
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

  _updateUserProfile() {
    let formData = {
      firstname: this.refs.firstName.value,
      lastname: this.refs.lastName.value,
      email: this.refs.email.value,
    };

    $.ajax({
      method: 'PUT',
      url: '/api/users',
      data: formData,
      success: function(data) {
        console.log(data);
      },
      error: function(err) {
        console.error('_updateUserProfile error', err);
      },
      dataType: 'json'
    })
  }

  render() {
    return (
      <div className="view settings-view">
        <h4 className="settings-view-welcome">Settings</h4>
        <h4 className="settings-view-instructions">Update your user settings below.</h4>

        <h4 className="form-title">Profile</h4>
        <form className="update-form">
          <div className="update-form-label">First Name</div>
          <div className="update-form-input firstname">
            <input type="text" name="firstname" placeholder="Update First Name" ref="firstName" required></input>
          </div>
          <div className="update-form-label">Last Name</div>
          <div className="update-form-input lastname">
            <input type="text" name="lastname" placeholder="Update Last Name" ref="lastName" required></input>
          </div>
          <div className="update-form-label">Email</div>
          <div className="update-form-input Email">
            <input type="email" name="Email" placeholder="Update Email" ref="email" required></input>
          </div>
        </form>
        <button className="update-button" onClick={this._updateUserProfile.bind(this)}>Update profile</button>

        <h4 className="form-title">Password</h4>
        <form className="update-password-form">
          <div className="update-form-label">Current Password</div>
          <div className="update-form-input password">
            <input type="password" name="currentpassword" placeholder="Enter current password" required></input>
          </div>
          <div className="update-form-label">New Password</div>
          <div className="update-form-input password">
            <input type="password" name="newpassword" placeholder="Enter new password" required></input>
          </div>
        </form>
        <button className="update-password-button">Set new password</button>
      </div>
    )
  }
}