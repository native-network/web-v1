import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

import Header from './shared/header';
import Modal from './shared/modal';
import WelcomeDialog from './welcome-dialog';
import { routes } from '../routes';

import styles from './App.css';
import native from '../assets/img/native.svg';

import { getUserAddress } from '../actions/userAddressActions';

export class App extends Component {
  state = {
    isWelcomeModalOpen: true,
  };

  closeWelcomeModal() {
    this.setState({ isWelcomeModalOpen: false });
  }

  componentDidMount = () => {
    this.props.getUserAddress();
  };

  render() {
    return (
      <Fragment>
        <Modal
          renderHeader={() => (
            <div className={styles.ModalHeader}>
              <img src={native} alt="" />
              <h1>Welcome To Native</h1>
              <button
                style={{ color: 'black' }}
                onClick={this.closeWelcomeModal.bind(this)}
              >
                x
              </button>
            </div>
          )}
          isOpen={this.state.isWelcomeModalOpen}
          label="Welcome to Native"
        >
          <WelcomeDialog dismissDialog={this.closeWelcomeModal.bind(this)} />
        </Modal>
        <Header
          session={this.props.user.session}
          isLoggedIn={this.props.isLoggedIn}
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
        session: state.user.session,
        isLoggedIn: !!state.user.address,
      },
    };
  },
  mapDispatchToProps,
)(App);

export default hot(module)(App);
