import React from 'react';
import ReactDom from 'react-dom';

export default class Footer extends React.Component { 
  render() {
    return (
      <div className="footer">
        <a href="/about" className="footer-link">About</a>
        <a href="https://github.com/chkakaja/sentimize" className="footer-link">Github</a>
        <a href="https://github.com/chkakaja/sentimize/blob/master/LICENSE" className="footer-link">License</a>
        <a href="https://github.com/chkakaja/sentimize/blob/master/CONTRIBUTING.md" className="footer-link">Contribute</a>
      </div>
    )
  }
}