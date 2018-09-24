import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../../store';
import { bindActionCreators } from 'redux';
import ReactTable, { ReactTableDefaults } from 'react-table';
import CommunityStake from '../../components/dialogs/community-stake';
import { getWeb3ServiceInstance } from '../../web3/Web3Service';
import { bigNumber } from '../../utils/helpers';
const { web3 } = getWeb3ServiceInstance();
const { fromWei } = web3.utils;

import eth from '../../assets/img/eth.svg';

import 'react-table/react-table.css';

import styles from './Dashboard.css';

import { promptAuthorize } from '../../actions/userSessionActions';
import {
  sendTransactionInEth,
  sendTransactionInNtv,
} from '../../actions/currencyActions';

import Loader from '../../components/shared/loader';
import Modal from '../../components/shared/modal';
import Button from '../../components/shared/button';
import CurrencyConverter from '../../components/forms/currency-converter';
import { formatUsd } from '../../utils/helpers';

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
    Cell: ({ value }) => {
      return formatUsd(value);
    },
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
    accessor: ({ price, quantity }) => (+price * +quantity).toFixed(2),
    Cell: ({ value }) => {
      return formatUsd(value);
    },
    Footer: ({ data }) => {
      const sum = data.reduce((sum, { total }) => {
        return (+total + +sum).toFixed(2);
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
      return value.communitySymbol === 'NTV' ? (
        ''
      ) : (
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
    isModalOpen: false,
    activeCommunity: {},
  };

  communityPrice(community) {
    if (community.currency.symbol === 'NTV') {
      return fromWei(this.props.prices.ntvWei) * this.props.prices.ethUSD;
    }
    return (
      fromWei(
        bigNumber(
          community.currency.price * this.props.prices.ntvWei,
        ).toString(),
      ) * this.props.prices.ethUSD
    );
  }

  authorize() {
    if (this.props.user.wallet.address) {
      this.props.promptAuthorize(this.props.user.wallet.address);
    }
  }

  redirect() {
    history.push('/');
  }

  submitTransaction(symbol, community, amount) {
    if (symbol === 'NTV') {
      this.props.sendTransactionInEth(community, amount);
    } else {
      this.props.sendTransactionInNtv(community, amount);
    }
  }

  renderAuthorizeModal() {
    return (
      <Modal
        hasCloseButton
        closeModal={this.redirect.bind(this)}
        label="Sign in"
        renderHeader={() => <h1 style={{ textAlign: 'center' }}>Sign in</h1>}
        isOpen={!this.props.hasSession}
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

  openModal(activeCommunity) {
    this.setState({ activeCommunity });
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const userEth = this.props.user.wallet.currencies.find(
      (c) => c.symbol === 'ETH',
    );
    const ethBalance = userEth && fromWei(userEth.balance);
    const ethInUSD = this.props.prices.ethUSD
      ? formatUsd(ethBalance * this.props.prices.ethUSD)
      : '$0';

    return this.props.isLoading ? (
      <Loader />
    ) : (
      <Fragment>
        {!this.props.hasSession ? (
          this.renderAuthorizeModal()
        ) : (
          <Fragment>
            <Modal
              hasCloseButton
              isOpen={this.state.isModalOpen}
              closeModal={this.closeModal.bind(this)}
              maxWidth="1020px"
            >
              <CommunityStake
                loading={this.props.isCurrencyLoading}
                user={this.props.user}
                community={this.state.activeCommunity}
                dismissDialog={true}
              />
            </Modal>
            <div className={styles.DashboardBanner}>
              <div>
                <div className={styles.TokenBalances}>
                  <div className={styles.Balance}>
                    <img src={eth} /> ETH Balance:&nbsp;
                    <b>{ethBalance}</b> ({ethInUSD})
                  </div>
                </div>
                <div>{this.props.user.wallet.address}</div>
              </div>
            </div>
            <section className={styles.Dashboard}>
              <h1>Convert Currencies</h1>
              {this.props.communities &&
              !!this.props.communities.length &&
              !!this.props.walletCurrencies.length ? (
                <CurrencyConverter
                  className={styles.DashboardConverter}
                  defaultValues={{
                    sendCurrency: this.props.walletCurrencies.find(
                      (currency) => currency.symbol === 'ETH',
                    ),
                    sendValue: '',
                    receiveValue: '',
                  }}
                  sendCurrencies={this.props.user.wallet.currencies.filter(
                    (currency) =>
                      (currency.symbol === 'ETH' ||
                        currency.symbol === 'NTV') &&
                      +currency.balance > 0,
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
                    const userBalance =
                      userCurrency && userCurrency.balance
                        ? fromWei(userCurrency.balance)
                        : '0';
                    return {
                      community: {
                        ...community,
                        symbol: currency && currency.symbol,
                        isCuratorOf: !!this.props.user.curatorOf.find(
                          (c) => c.id === community.id,
                        ),
                      },
                      quantity: bigNumber(userBalance)
                        .decimalPlaces(3)
                        .toString(),
                      price: this.communityPrice(community),
                      actions: {
                        name: this.props.user.memberOf.find(
                          (c) => c.id === community.id,
                        )
                          ? `Get ${currency && currency.symbol}`
                          : `Support Community`,
                        clickHandler: () => this.openModal(community),
                        communitySymbol: community.currency.symbol,
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
    promptAuthorize: bindActionCreators(promptAuthorize, dispatch),
  };
};

export default connect(
  (state) => {
    return {
      communities: state.communities.communities,
      isCurrencyLoading: state.currencies.loading,
      isLoading: state.loading > 0,
      hasSession: !!state.user.id,
      user: state.user,
      walletCurrencies: state.user.wallet.currencies,
      prices: state.prices,
    };
  },
  mapDispatchToProps,
)(Dashboard);
