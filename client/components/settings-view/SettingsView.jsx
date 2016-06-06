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

  _updateProfile() {
    let formData = {
      firstname: this.refs.firstName.value,
      lastname: this.refs.lastName.value,
      email: this.refs.email.value,
      hasNewPassword: 'false'
    };

    $.ajax({
      method: 'PUT',
      url: '/api/users',
      data: formData,
      success: function(data) {
        console.log(data);
        $(this.refs.updateButton).text('Profile updated');
      }.bind(this),
      error: function(err) {
        console.error('_updateUserProfile error', err);
      },
      dataType: 'json'
    });
  }

  _setNewPassword() {
    let formData = {
      currentPassword: this.refs.currentPassword.value,
      newPassword: this.refs.newPassword.value,
      hasNewPassword: 'true'
    };

    $.ajax({
      method: 'PUT',
      url: '/api/users',
      data: formData,
      success: function(data) {
        console.log(data);
        $(this.refs.updatePasswordButton).text('Password updated');
      }.bind(this),
      error: function(err) {
        console.error('_setNewPassword error', err);
      },
      dataType: 'json'
    });
  }

  render() {
    return (
      <div className="view settings-view">
        <h4 className="settings-view-title">My Settings</h4>
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
        <button className="update-button" ref="updateButton" onClick={this._updateProfile.bind(this)}>Update profile</button>

        <h4 className="form-title">Password</h4>
        <form className="update-password-form">
          <div className="update-form-label">Current Password</div>
          <div className="update-form-input current-password">
            <input type="password" name="currentpassword" placeholder="Enter current password" ref="currentPassword" required></input>
          </div>
          <div className="update-form-label">New Password</div>
          <div className="update-form-input new-password">
            <input type="password" name="newpassword" placeholder="Enter new password" ref="newPassword" required></input>
          </div>
        </form>
        <button className="update-password-button" ref="updatePasswordButton" onClick={this._setNewPassword.bind(this)}>Set new password</button>
      </div>
    )
  }
}
