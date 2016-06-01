import React from 'react';
import ReactDom from 'react-dom';
import { Link } from 'react-router';

export default (
  <div className="nav-bar">
    <h1 className="nav-bar-title"><Link to="/">Sentimize</Link></h1>
    <Link to="/record">Record</Link>
    <Link to="/sessions">Sessions</Link>
  </div>
)