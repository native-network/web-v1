import React, { Component, Fragment } from 'react';
import Header from './shared/header';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { routes } from '../routes';
import { getUserAddress, getUserSession } from '../actions/userActions';

export class App extends Component {
  componentDidMount = () => {
    const address = this.props.getUserAddress();
    if (address) {
      this.props.getUserSession();
    }
  };

  render() {
    return (
      <Fragment>
        <Header
          isLoggedIn={this.props.isLoggedIn}
          hasSession={this.props.hasSession}
        />
        {routes()}
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUserAddress: () => dispatch(getUserAddress()),
    getUserSession: () => dispatch(getUserSession()),
  };
}

// eslint-disable-next-line no-class-assign
App = connect(
  (state) => {
    return {
      location: state.router.location,
      isLoggedIn: !!state.user.address,
      hasSession: !!state.user.session,
    };
  },
  mapDispatchToProps,
)(App);

export default hot(module)(App);
