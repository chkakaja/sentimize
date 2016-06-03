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
            <li className="pure-menu-item"><Link to="/sessions" className="pure-menu-link">Sessions</Link></li>
            <li className="pure-menu-item"><Link to="/reports" className="pure-menu-link">Reports</Link></li>
            <li className="pure-menu-item"><a href="/logout" className="pure-menu-link">Log out</a></li>
          </ul>
        </div>
      </div>
    )
  }
}