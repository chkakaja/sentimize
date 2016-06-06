import React from 'react';
import ReactDom from 'react-dom';

export default class Footer extends React.Component { 
  render() {
    return (
      <div className="footer">
        <a href="https://github.com/chkakaja/sentimize/blob/master/README.md" className="footer-link">About</a>
        <a href="https://github.com/chkakaja/sentimize" target="_blank" className="footer-link">Github</a>
        <a href="https://github.com/chkakaja/sentimize/blob/master/LICENSE" target="_blank" className="footer-link">License</a>
        <a href="https://github.com/chkakaja/sentimize/blob/master/CONTRIBUTING.md" target="_blank" className="footer-link">Contribute</a>
      </div>
    )
  }
}