import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import MainLayout from './Mainlayout.jsx';
import HomeView from './home-view/HomeView.jsx';
import RecordView from './record-view/RecordView.jsx';
import SessionsView from './sessions-view/SessionsView.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={MainLayout}>
          <IndexRoute component={HomeView} />
          <Route path="record" component={RecordView} />
          <Route path="sessions" component={SessionsView} />
        </Route>
      </Router>
    )
  }
}