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
import CurrencyConverter from '../../components/forms/currency-converter';

import eth from '../../assets/img/eth.svg';
import native from '../../assets/img/native.svg';

const currencies = [
  {
    symbol: 'ETH',
    iconUrl: eth,
    balance: 3.14,
    inUsd: '$1,353.34',
    inEth: 1,
  },
  {
    symbol: 'NT',
    iconUrl: native,
    balance: 1491.9234,
    inUsd: '$1,353.34',
    inEth: 0.83749,
  },
];
export class Dashboard extends Component {
  state = {
    hasSession: this.props.hasSession || false,
    userCurrencies: currencies,
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.hasSession !== prevProps.hasSession &&
      this.props.hasSession
    ) {
      this.setState({ hasSession: true });
    }
  }

  authorize() {
    if (this.props.user.address) {
      this.props.promptAuthorize(this.props.user.address);
    }
  }

  renderModal() {
    return (
      <Modal
        label="Sign in"
        renderHeader={() => <h1 style={{textAlign: 'center'}}>Sign in</h1>}
        isOpen={!this.state.hasSession}
      >
        <Button
          centered
          theme="primary"
          content="Authorize"
          clickHandler={this.authorize.bind(this)}
        />
      </Modal>
    );
  }

  render() {
    console.log(this.props.currencies) // els
    return this.props.isLoading ? (
      <Loader />
    ) : (
      <Fragment>
        {this.state.hasSession ? (
          <section className={styles.Dashboard}>
            <h1>Convert Tokens</h1>
            <CurrencyConverter
              defaultValues={{
                send: undefined,
                receive: undefined,
              }}
              sendCurrencies={this.state.userCurrencies}
              receiveCurrencies={this.props.currencies}
            />
            <div className={styles.TableTitle}>
              <h1>Your Tribes</h1>
            </div>
            <div className={styles.Table}>
              &lt;Tabular Data&gt;
              {this.props.tribes && this.props.tribes.map((tribe) => <div key={tribe.name}>{tribe.name}</div>)}
            </div>
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
    console.log(state);
    return {
      isLoading: state.loading > 0,
      hasSession: !!state.user.id,
      user: state.user,
      currencies: state.currencies.currencies,
    };
  },
  mapDispatchToProps,
)(Dashboard);
