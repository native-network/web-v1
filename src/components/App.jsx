import React, { Component, Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './shared/header';
import Footer from './shared/footer';
import Modal from './shared/modal';
import WelcomeDialog from './dialogs/welcome-dialog';
import { routes } from '../routes';

import styles from './App.css';
import native from '../assets/img/native.svg';

import { getUserSession, refreshAccounts } from '../actions/userSessionActions';
import { getCurrentPrices } from '../actions/pricesActions';

export class App extends Component {
  state = {
    isWelcomeModalOpen: false,
    refreshIntervalSet: false,
  };

  componentWillMount() {
    if (!localStorage.getItem('visited')) {
      this.setState({ isWelcomeModalOpen: true });
    }
    this.props.getCurrentPrices();
  }

  componentDidUpdate(prevProps) {
    const { address: oldUserAddress } = prevProps.user.wallet;
    const { address: newUserAddress } = this.props.user.wallet;

    if (!!newUserAddress && newUserAddress !== oldUserAddress) {
      this.props.getUserSession();
    }
    if (!this.state.refreshIntervalSet && this.props.user) {
      setInterval(() => {
        this.props.refreshAccounts(this.props.user);
      }, 1000);
      this.setState({ refreshIntervalSet: true });
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
          hasCloseButton
          closeModal={this.closeWelcomeModal.bind(this)}
          renderHeader={() => (
            <div className={styles.ModalHeader}>
              <img src={native} alt="" />
              <h1>Welcome To Native</h1>
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
        {routes(this.props.user)}
        <Footer location={this.props.location} user={this.props.user} />
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUserSession: bindActionCreators(getUserSession, dispatch),
    refreshAccounts: bindActionCreators(refreshAccounts, dispatch),
    getCurrentPrices: bindActionCreators(getCurrentPrices, dispatch),
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
