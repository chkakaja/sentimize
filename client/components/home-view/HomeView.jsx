import React from 'react';
import ReactDom from 'react-dom';

export default class HomeView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="view home-view">
        <h4>HomeView!</h4>
      </div>
    )
  }
}