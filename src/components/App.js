import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import LandingPage from './LandingPage';
import RegistrationPage from './RegistrationPage';
import Playscreen from './playscreen/Playscreen';
import { refreshAuthToken } from '../actions/auth';
import { save } from '../actions/user';

import 'normalize.css';

class App extends React.Component {

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedIn && this.props.loggedIn) {
      // When we are logged in, refresh the auth token periodically and autosave
      this.autoSave();
      this.startPeriodicRefresh();
    } else if (prevProps.loggedIn && !this.props.loggedIn) {
      // Stop refreshing when we log out
      this.stopPeriodicRefresh();
    }
  }
  componentWillUnmount() {
    this.stopPeriodicRefresh();
  }
  startPeriodicRefresh() {
    this.refreshInterval = setInterval(
      () => this.props.dispatch(refreshAuthToken()),
      60 * 60 * 1000 // One hour
    );
  }
  stopPeriodicRefresh() {
    if (!this.refreshInterval) {
      return;
    }
    clearInterval(this.refreshInterval);
    clearInterval(this.saveInterval);

  }
  autoSave() {
    this.saveInterval = setInterval(
      () => this.props.dispatch(save()),
      40000 //40 seconds
    );
  }

  render() {
    return (
      <div role='main' className="app">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/playscreen" component={Playscreen} />
        <Route exact path="/register" component={RegistrationPage} />


      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.user.currentUser !== null,
  currentUser: state.user.currentUser
});

export default withRouter(connect(mapStateToProps)(App));
