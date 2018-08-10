import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './shared/header';
import Modal from './shared/modal';
import WelcomeDialog from './welcome-dialog';
import { routes } from '../routes';

import styles from './App.css';
import native from '../assets/img/native.svg';

import { getUserAddress } from '../actions/userAddressActions';
import { getUserSession } from '../actions/userSessionActions';

export class App extends Component {
  state = {
    isWelcomeModalOpen: false,
  };

  componentWillMount() {
    this.props.getUserAddress();
    if (!localStorage.getItem('visited')) {
      this.setState({ isWelcomeModalOpen: true });
    }
  }

  componentDidUpdate(prevProps) {
    const { address: oldUserAddress } = prevProps.user;
    const { address: newUserAddress } = this.props.user;

    if (!!newUserAddress && newUserAddress !== oldUserAddress) {
      this.props.getUserSession();
    }
  }

  closeWelcomeModal() {
    this.setState({ isWelcomeModalOpen: false });
  }

  finishWelcomeModalSteps() {
    localStorage.setItem('visited', 1);
    this.closeWelcomeModal();
  }

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
          <WelcomeDialog
            dismissDialog={this.finishWelcomeModalSteps.bind(this)}
          />
        </Modal>
        <Header
          user={this.props.user}
          isLoggedIn={this.props.user.isLoggedIn}
        />
        {routes(
          this.props.user.session && this.props.user.session.role === 'curator',
        )}
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUserAddress: bindActionCreators(getUserAddress, dispatch),
    getUserSession: bindActionCreators(getUserSession, dispatch),
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
