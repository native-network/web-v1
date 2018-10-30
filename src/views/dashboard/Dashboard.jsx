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
import native from '../../assets/img/native.svg';

import { promptAuthorize } from '../../actions/userSessionActions';
import {
  sendTransactionInEth,
  sendTransactionInNtv,
} from '../../actions/currencyActions';

import Loader from '../../components/shared/loader';
import Modal from '../../components/shared/modal';
import Button from '../../components/shared/button';
import CurrencyConverter from '../../components/forms/currency-converter';
import WalletAddress from '../../components/shared/wallet-address';
import { formatUsd } from '../../utils/helpers';

Object.assign(ReactTableDefaults, {
  minRows: 0,
  showPaginationBottom: false,
});

const cols = [
  {
    Header: 'Community Name',
    accessor: 'community',
    Cell: ({ value }) =>
      value.isMemberOf || value.isCuratorOf ? (
        <div className={styles.CommunityLink}>
          <Link className={styles.CommunityLink} to={`/community/${value.id}`}>
            <img src={value.icon} />
            <span>
              <span className={styles.CommunityTitle}>
                {value.name} ({value.symbol})
              </span>
              {value.isCuratorOf ? (
                <span className={styles.Curator}>Curator</span>
              ) : null}
              {value.isMemberOf ? (
                <span className={styles.Member}>Member</span>
              ) : null}
            </span>
          </Link>
          {value.isCuratorOf ? (
            <Link className={styles.CommunityLink} to={`/manage/${value.id}`}>
              <span className={styles.CommunityTitle}>Manage Community</span>
            </Link>
          ) : null}
        </div>
      ) : (
        <div className={styles.CommunityLinkDisabled}>
          <img src={value.icon} />
          <span>
            <span className={styles.CommunityTitle}>
              {value.name} ({value.symbol})
            </span>
            {value.isCuratorOf ? (
              <span className={styles.Curator}>Curator</span>
            ) : null}
            {value.isMemberOf ? (
              <span className={styles.Member}>Member</span>
            ) : null}
          </span>
        </div>
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
    sendCurrency: this.props.walletCurrencies.find(
      (currency) => currency.symbol === 'ETH',
    ),
    receiveCurrency: undefined,
    receiveValue: undefined,
    sendValue: undefined,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.walletCurrencies !== this.props.walletCurrencies) {
      const { walletCurrencies } = this.props;

      const sendCurrency = walletCurrencies.find(
        (currency) => currency.symbol === 'ETH',
      );

      this.setState({ sendCurrency });
    }

    if (
      prevState.sendCurrency !== this.state.sendCurrency ||
      prevState.receiveCurrency !== this.state.receiveCurrency
    ) {
      this.setState({
        receiveValue: undefined,
        sendValue: undefined,
      });
    }
  }

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
        renderHeader={() => (
          <div className={styles.ModalHeader}>
            <img src={native} alt="" />
            <h1>Connect Your Wallet to Continue</h1>
          </div>
        )}
        isOpen={!this.props.hasSession}
      >
        <Button
          centered
          theme="primary"
          content="Sign Message"
          className={styles.AuthorizeButton}
          clickHandler={this.authorize.bind(this)}
        />
      </Modal>
    );
  }

  populateConverter() {
    const { walletCurrencies } = this.props;
    const { activeCommunity } = this.state;
    const native = walletCurrencies.find(
      (currency) => currency.symbol === 'NTV',
    );
    const ethereum = walletCurrencies.find(
      (currency) => currency.symbol === 'ETH',
    );
    const communityStake = fromWei(activeCommunity.currency.minimumStake);
    const nativeBalance = fromWei(native.balance);
    const nativePrice = fromWei(native.price);

    const receiveValue = bigNumber(communityStake)
      .minus(nativeBalance)
      .decimalPlaces(18)
      .toString();

    const sendValue = bigNumber(receiveValue)
      .multipliedBy(nativePrice)
      .decimalPlaces(18)
      .toString();

    this.setState(
      {
        sendCurrency: ethereum,
        receiveCurrency: native,
      },
      () =>
        this.setState(
          {
            receiveValue,
            sendValue,
          },
          () => this.closeModal(),
        ),
    );

    window.scrollTo(0, this.form.offsetTop);
  }

  openModal(activeCommunity) {
    this.setState({
      activeCommunity: {
        ...activeCommunity,
        submitTransaction: this.submitTransaction.bind(this),
      },
    });
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
    const nativeCurrency = this.props.user.wallet.currencies.find(
      (c) => c.symbol === 'NTV',
    );
    const nativeBalance = nativeCurrency && nativeCurrency.balance;

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
                populateNativeBalance={this.populateConverter.bind(this)}
                community={this.state.activeCommunity}
                dismissDialog={this.closeModal.bind(this)}
              />
            </Modal>
            <div className={styles.DashboardBanner}>
              <div className={styles.TokenBalances}>
                <div className={styles.Balance}>
                  <img src={eth} /> ETH Balance:&nbsp;
                  <b>{ethBalance}</b> ({ethInUSD})
                </div>
                <WalletAddress
                  displayPrepend
                  address={this.props.user.wallet.address}
                />
              </div>
            </div>
            <section className={styles.Dashboard}>
              <h1 className={styles.DashboardTitle}>
                {!nativeBalance || nativeBalance === '0'
                  ? 'Get Native Token'
                  : 'Convert Currencies'}
              </h1>
              {this.state.sendCurrency ? (
                <div>
                  <CurrencyConverter
                    formRef={(form) => (this.form = form)}
                    className={styles.DashboardConverter}
                    defaultValues={{
                      sendCurrency: this.state.sendCurrency,
                      sendValue: this.state.sendValue,
                      receiveValue: this.state.receiveValue,
                      receiveCurrency: this.state.receiveCurrency,
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
                  <p className={styles.DashboardConverterMessage}>
                    Welcome to the Native Alpha. Beta (Q1 2019) will enable
                    conversions from Community Tokens and NTV back into other
                    cryptocurrencies.
                  </p>
                </div>
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
                        isMemberOf: !!this.props.user.memberOf.find(
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
