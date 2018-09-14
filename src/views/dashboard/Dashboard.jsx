import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTable, { ReactTableDefaults } from 'react-table';

import eth from '../../assets/img/eth.svg';

import 'react-table/react-table.css';

import styles from './Dashboard.css';

import {
  getUserSession,
  promptAuthorize,
} from '../../actions/userSessionActions';
import {
  sendTransactionInEth,
  sendTransactionInNtv,
} from '../../actions/currencyActions';

import Loader from '../../components/shared/loader';
import Modal from '../../components/shared/modal';
import Button from '../../components/shared/button';
import CurrencyConverter from '../../components/forms/currency-converter';

Object.assign(ReactTableDefaults, {
  minRows: 0,
  showPaginationBottom: false,
});

const cols = [
  {
    Header: 'Community Name',
    accessor: 'community',
    Cell: ({ value }) => (
      <Link className={styles.CommunityLink} to={`/community/${value.id}`}>
        <img src={value.icon} />
        <span>
          <span className={styles.CommunityTitle}>
            {value.name} ({value.symbol})
          </span>
          {value.isCuratorOf ? (
            <span className={styles.Curator}>Curator</span>
          ) : null}
        </span>
      </Link>
    ),
    headerStyle: {
      textAlign: 'left',
    },
  },
  {
    Header: 'Quantity',
    accessor: 'quantity',
    style: {
      textAlign: 'right',
    },
    headerStyle: {
      textAlign: 'right',
    },
    maxWidth: 150,
  },
  {
    Header: 'Price',
    accessor: 'price',
    maxWidth: 150,
    Cell: ({ value }) => `$${value}`,
    style: {
      textAlign: 'right',
    },
    headerStyle: {
      textAlign: 'right',
    },
  },
  {
    Header: 'Total',
    id: 'total',
    maxWidth: 150,
    accessor: ({ price, quantity }) => +price * +quantity,
    Cell: ({ value }) => `$${value}`,
    Footer: ({ data }) => {
      const sum = data.reduce((sum, { total }) => {
        return total + +sum;
      }, 0);

      return `$${sum}`;
    },
    style: {
      textAlign: 'right',
    },
    headerStyle: {
      textAlign: 'right',
    },
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    sortable: false,
    resizable: false,
    maxWidth: 300,
    Cell: ({ value }) => {
      return (
        <Button
          block
          theme="primary"
          content={value.name}
          clickHandler={value.clickHandler}
        />
      );
    },
    headerStyle: {
      textAlign: 'left',
    },
  },
];

export class Dashboard extends Component {
  state = {
    hasSession: this.props.hasSession || false,
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

  submitTransaction(symbol, community, amount) {
    if (symbol === 'NTV') {
      this.props.sendTransactionInEth(community, amount);
    } else {
      this.props.sendTransactionInNtv(community, amount);
    }
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
        {!this.state.hasSession ? (
          this.renderModal()
        ) : (
          <Fragment>
            <div className={styles.DashboardBanner}>
              <div>
                <div className={styles.TokenBalances}>
                  <div className={styles.Balance}>
                    <img src={eth} /> ETH Balance:
                    {` `}
                    <b>
                      {
                        this.props.user.wallet.currencies.find(
                          (c) => c.symbol === 'ETH',
                        ).balance
                      }
                    </b>{' '}
                    ($100)
                  </div>
                </div>
                <div>{this.props.user.wallet.address}</div>
              </div>
            </div>
            <section className={styles.Dashboard}>
              <h1>Convert Currencies</h1>
              {this.props.communities && this.props.communities.length ? (
                <CurrencyConverter
                  className={styles.DashboardConverter}
                  defaultValues={{
                    sendCurrency: this.props.user.wallet.currencies.find(
                      (currency) => currency.symbol === 'ETH',
                    ),
                    sendValue: '',
                    receiveValue: '',
                  }}
                  sendCurrencies={this.props.user.wallet.currencies.filter(
                    (currency) =>
                      (currency.symbol === 'ETH' ||
                        currency.symbol === 'NTV') &&
                      currency.balance > 0,
                  )}
                  receiveCurrencies={this.props.communities.map(
                    (c) => c.currency,
                  )}
                  submitHandler={this.submitTransaction.bind(this)}
                />
              ) : null}
              <div className={styles.TableTitle}>
                <h1>Your Communities</h1>
              </div>
              <div className={styles.Table}>
                <ReactTable
                  columns={cols}
                  data={this.props.communities.map((community) => {
                    const userCurrency = this.props.user.wallet.currencies.find(
                      (c) => c.symbol === community.currency.symbol,
                    );
                    const { currency } = community;
                    return {
                      community: {
                        ...community,
                        symbol: currency && currency.symbol,
                        isCuratorOf: !!this.props.user.curatorOf.find(
                          (c) => c.id === community.id,
                        ),
                      },
                      quantity: (userCurrency && userCurrency.balance) || 0,
                      price: Math.random().toFixed(2),
                      actions: {
                        name: this.props.user.memberOf.find(
                          (c) => c.id === community.id,
                        )
                          ? `Get ${currency && currency.symbol}`
                          : `Support Community`,
                        clickHandler: () => alert('Clicked!'),
                      },
                    };
                  })}
                />
              </div>
            </section>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendTransactionInEth: bindActionCreators(sendTransactionInEth, dispatch),
    sendTransactionInNtv: bindActionCreators(sendTransactionInNtv, dispatch),
    getUserSession: bindActionCreators(getUserSession, dispatch),
    promptAuthorize: bindActionCreators(promptAuthorize, dispatch),
  };
};

export default connect(
  (state) => {
    return {
      communities: state.communities.communities,
      isLoading: state.loading > 0,
      hasSession: !!state.user.id,
      user: state.user,
    };
  },
  mapDispatchToProps,
)(Dashboard);
