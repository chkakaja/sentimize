import React from 'react';

export default class SettingsView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="view settings-view">
        <h4 className="settings-view-welcome">Profile Settings</h4>
        <form method="PUT" action="/api/users">
          <div className="update-form-label">First Name</div>
          <div className="update-form-input firstname">
            <input type="text" name="firstname" placeholder="First Name" value="Test"></input>
          </div>
          <div className="update-form-label">Last Name</div>
          <div className="update-form-input lastname">
            <input type="text" name="lastname" placeholder="Last Name" value="Test"></input>
          </div>
          <div className="update-form-label">Email</div>
          <div className="update-form-input Email">
            <input type="text" name="Email" placeholder="Email" value="Test"></input>
          </div>
          <div className="update-form-label">Password</div>
          <div className="update-form-input password">
            <input type="text" name="password" placeholder="Password" value="Test"></input>
          </div>
          <button className="save-button">Sign up</button>
        </form>
      </div>
    )
  }
}