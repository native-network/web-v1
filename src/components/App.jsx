import React, { Component, Fragment } from 'react';
import Header from './shared/header';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { routes } from '../routes';
import { getUserAddress } from "../actions/userActions";
import { promptSign } from "../web3";

export class App extends Component {
  componentDidMount = () => {
    this.props.getUserAddress();
    promptSign('nonce');
  };

  render() {
      const { user } = this.props;
    return (
      <Fragment>
          <h3>{user.address}</h3>
        <Header location={this.props.location} />
        {routes()}
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserAddress: () => dispatch(getUserAddress())
    };
}

App = connect(
  (state) => {
    return {
      location: state.router.location,
      user: state.user
    };
  },
  mapDispatchToProps
)(App);

export default hot(module)(App);
