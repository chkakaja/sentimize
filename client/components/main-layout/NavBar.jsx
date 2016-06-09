import React from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';

export default class NavBar extends React.Component {
  render() {
    return (
      <div className="nav-bar">
        <div className="pure-menu-heading">
          <Link className="home-link" to="/">Sentimize</Link>
        </div>

        <div className="pure-menu pure-menu-horizontal pure-menu-fixed">
          <ul className="pure-menu-list">
            <li className="pure-menu-item"><Link to="/record" className="pure-menu-link">Record</Link></li>
            <li className="pure-menu-item"><Link to="/sessions/interviewer" className="pure-menu-link"> Interviewer Sessions</Link></li>
            <li className="pure-menu-item"><Link to="/sessions/interviewee" className="pure-menu-link"> Interviewee Sessions</Link></li>
            <li className="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
              <div className="pure-menu-link nav-bar-dropdown"><i className="fa fa-cog fa-lg" aria-hidden="true"></i></div>
              <ul className="pure-menu-children"> 
                <li className="pure-menu-item"><Link to="/settings" className="pure-menu-link dropdown-link">Settings</Link></li>
                <li className="pure-menu-item"><a href="/logout" className="pure-menu-link dropdown-link">Log out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}