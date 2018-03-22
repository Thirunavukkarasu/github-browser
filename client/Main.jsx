import React, { Component } from 'react';
import UserDetailPage from './containers/UserDetailPage';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom'

import HomePage from './containers/HomePage.jsx';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users : [],
      loading : false
   };
  };

  render() {
    return (
        <Router>
          <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-primary">
              <Link className="navbar-brand" to="/">Github Browser</Link>
            </nav>
            <Route exact path="/" component={HomePage} />
            <Route path="/userdetail/:id" component={UserDetailPage} />
          </div>

        </Router>
    );
  }
}

export default Main;