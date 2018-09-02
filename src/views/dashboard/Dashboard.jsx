import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import styles from './Dashboard.css';

import {
  getUserSession,
  promptAuthorize,
} from '../../actions/userSessionActions';
import { sendTransaction } from '../../actions/currencyActions';

import Loader from '../../components/shared/loader';
import Modal from '../../components/shared/modal';
import Button from '../../components/shared/button';
import CurrencyConverter from '../../components/forms/currency-converter';

import { currencies } from '../../utils/constants';

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
    if (this.props.user.wallet.address) {
      this.props.promptAuthorize(this.props.user.wallet.address);
    }
  }

  submitTransaction(community, amount) {
    this.props.sendTransaction(community, amount);
  }

  renderModal() {
    return (
      <Modal
        label="Sign in"
        renderHeader={() => <h1 style={{ textAlign: 'center' }}>Sign in</h1>}
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
    return this.props.isLoading ? (
      <Loader />
    ) : (
      <Fragment>
        {this.state.hasSession ? (
          <section className={styles.Dashboard}>
            <h1>Convert Tokens</h1>
            <CurrencyConverter
              defaultValues={{
                sendCurrency: this.props.user.wallet.currencies.find(
                  (c) => c.symbol === 'ETH',
                ),
                sendValue: undefined,
                receiveCurrency: this.props.currencies[0],
                receiveValue: undefined,
              }}
              sendCurrencies={this.props.user.wallet.currencies}
              receiveCurrencies={this.props.currencies}
              submitHandler={this.submitTransaction.bind(this)}
            />
            <div className={styles.TableTitle}>
              <h1>Your Communities</h1>
            </div>
            <div className={styles.Table}>
              &lt;Tabular Data&gt;
              {this.props.communities &&
                this.props.communities.map((community) => (
                  <div key={community.name}>{community.name}</div>
                ))}
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
    sendTransaction: bindActionCreators(sendTransaction, dispatch),
    getUserSession: bindActionCreators(getUserSession, dispatch),
    promptAuthorize: bindActionCreators(promptAuthorize, dispatch),
  };
};

export default connect(
  (state) => {
    return {
      isLoading: state.loading > 0,
      hasSession: !!state.user.id,
      user: state.user,
      currencies: state.currencies.currencies,
    };
  },
  mapDispatchToProps,
)(Dashboard);
