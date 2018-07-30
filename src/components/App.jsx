import React, { Component, Fragment } from 'react';
import Header from './shared/header';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { routes } from '../routes';
import { getUserAddress } from '../actions/userActions';

export class App extends Component {
  componentDidMount = () => {
    this.props.getUserAddress();
  };

  render() {
    return (
      <Fragment>
        <Header
          isLoggedIn={this.props.user.isLoggedIn}
          session={this.props.user.session}
        />
        {routes()}
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUserAddress: () => dispatch(getUserAddress()),
  };
}

// eslint-disable-next-line no-class-assign
App = connect(
  (state) => {
    return {
      location: state.router.location,
      user: {
        address: state.user.address,
        isLoggedIn: !!state.user.address,
      },
    };
  },
  mapDispatchToProps,
)(App);

export default hot(module)(App);
