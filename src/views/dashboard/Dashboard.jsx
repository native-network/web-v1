/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './Dashboard.css';

import {
  getUserSession,
  promptAuthorize,
} from '../../actions/userSessionActions';

import Loader from '../../components/shared/loader';
import Modal from '../../components/shared/modal';
import Button from '../../components/shared/button';
import CurrencyConverter from '../../components/shared/currency-converter';

import eth from '../../assets/img/eth.svg';
import native from '../../assets/img/native.svg';

const currencies = [
  {
    id: 'ETH',
    thumb: eth,
    balance: 3.14,
    inUsd: '$1,353.34',
  },
  {
    id: 'NT',
    thumb: native,
    balance: 1.9234,
    inUsd: '$1,353.34',
  },
  {
    id: 'EGTT',
    thumb: 'http://placehold.it/50x50',
  },
  {
    id: 'CCTT',
    thumb: 'http://placehold.it/50x50',
  },
  {
    id: 'IFTT',
    thumb: 'http://placehold.it/50x50',
  },
];

export class Dashboard extends Component {
  state = {
    hasSession: this.props.hasSession || false,
    userCurrencies: currencies,
  };

  componentDidMount() {
    this.props.getUserSession();
  }

  componentDidUpdate(prevProps) {
    if (this.props.hasSession !== prevProps.hasSession && this.props.hasSession) {
      this.setState({ hasSession: true });
    }
  }

  authorize() {
    this.props.promptAuthorize();
    this.setState({ hasSession: true });
  }

  renderModal() {
    return (
      <Modal
        title="Sign in"
        isModalOpen={!this.state.hasSession}
        render={() => {
          return (
            <Button
              centered
              theme="primary"
              content="Authorize"
              clickHandler={this.authorize.bind(this)}
            />
          );
        }}
      />
    );
  }

  render() {
    return this.props.isLoading ? (
      <Loader />
    ) : (
      <Fragment>
        {this.state.hasSession ? (
          <section className={styles.Dashboard}>
            <div className={styles.TokenBalance}>
              <h1>Convert Tokens</h1>
              {this.state.userCurrencies
                .filter((currency) => currency.balance && currency.balance > 0)
                .map(
                  (currency, i) => (
                    <span key={i} className={styles.Balance}>
                      <img src={currency.thumb} />
                      {currency.id} {currency.balance} {currency.inUsd}
                    </span>
                  ),
                )}
            </div>
            <CurrencyConverter currencies={this.state.userCurrencies} />
            <div className={styles.TableTitle}>
              <h1>Your Tribes</h1>
            </div>
            <div className={styles.Table}>&lt;Tabular Data&gt;</div>
          </section>
        ) : (
          this.renderModal()
        )}
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserSession: bindActionCreators(getUserSession, dispatch),
    promptAuthorize: bindActionCreators(promptAuthorize, dispatch),
  };
};

export default connect(
  (state) => {
    return {
      isLoading: state.loading > 0,
      hasSession: state.user.session && state.user.session.length > 0,
    };
  },
  mapDispatchToProps,
)(Dashboard);
