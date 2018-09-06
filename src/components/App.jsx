import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './shared/header';
import Footer from './shared/footer';
import Modal from './shared/modal';
import WelcomeDialog from './welcome-dialog';
import { routes } from '../routes';

import styles from './App.css';
import native from '../assets/img/native.svg';

import { getUserSession } from '../actions/userSessionActions';
import { getUserWalletCommunityBalance } from '../actions/userWalletActions';

export class App extends Component {
  state = {
    isWelcomeModalOpen: false,
  };

  componentWillMount() {
    if (!localStorage.getItem('visited')) {
      this.setState({ isWelcomeModalOpen: true });
    }
  }

  componentDidUpdate(prevProps) {
    const { address: oldUserAddress } = prevProps.user.wallet;
    const { address: newUserAddress } = this.props.user.wallet;

    if (!!newUserAddress && newUserAddress !== oldUserAddress) {
      this.props.getUserSession();
    }

    if (
      !!this.props.currencies &&
      !!newUserAddress &&
      this.props.currencies !== prevProps.currencies &&
      this.props.communities.length === this.props.currencies.length
    ) {
      this.props.getUserWalletCommunityBalance(newUserAddress);
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
          location={this.props.location}
          user={this.props.user}
          isLoggedIn={this.props.isLoggedIn}
        />
        {routes(this.props.user && this.props.user.role === 'curator')}
        <Footer location={this.props.location} user={this.props.user} />
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUserWalletCommunityBalance: bindActionCreators(
      getUserWalletCommunityBalance,
      dispatch,
    ),
    getUserSession: bindActionCreators(getUserSession, dispatch),
  };
}

// eslint-disable-next-line no-class-assign
App = connect(
  (state) => {
    const { communities } = state.communities;
    const { currencies } = state.currencies;
    const { location } = state.router;
    const { user } = state;
    return {
      communities,
      currencies,
      location,
      user,
      isLoggedIn: !!user.wallet.address,
    };
  },
  mapDispatchToProps,
)(App);

export default hot(module)(App);
