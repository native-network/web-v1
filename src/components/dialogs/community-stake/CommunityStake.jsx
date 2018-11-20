import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BigNumber from 'bignumber.js';

import Dialog from '../Dialog';
import ConvertCurrency from './steps/ConvertCurrency';
import ProcessTransaction from './steps/ProcessTransaction';
import StakeCommunity from './steps/StakeCommunity';
import InsufficientFunds from './steps/InsufficientFunds';

class CommunityStake extends Component {
  static propTypes = {
    community: PropTypes.object,
    user: PropTypes.object,
  };

  state = { components: [] };

  componentDidMount() {
    const { community, user } = this.props;
    const userCurrency = user.wallet.currencies.find(
      (c) => c.symbol === community.currency.symbol,
    );
    const userMemberOf = user.memberOf.find((c) => c.id === community.id);
    const nativeCurrency = user.wallet.currencies.find(
      (c) => c.symbol === 'NTV',
    );
    const nativeBalance = nativeCurrency && nativeCurrency.balance;
    const minStake = community.currency && community.currency.minimumStake;
    const communityPrice = community.currency && community.currency.price;
    const communityBalance = userCurrency && userCurrency.balance;

    const stakeInNative = new BigNumber(communityPrice)
      .multipliedBy(minStake - communityBalance)
      .toString();

    if (
      +nativeBalance < +stakeInNative &&
      +communityBalance < minStake &&
      !userMemberOf
    ) {
      this.setState({ components: [InsufficientFunds] });
    } else if (userMemberOf) {
      this.setState({
        components: [ConvertCurrency, ProcessTransaction],
      });
    } else if (+communityBalance >= +minStake) {
      this.setState({ components: [StakeCommunity, ProcessTransaction] });
    } else {
      this.setState({
        components: [
          ConvertCurrency,
          ProcessTransaction,
          StakeCommunity,
          ProcessTransaction,
        ],
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error && !!this.props.error) {
      this.props.dismissDialog();
    }

    if (this.props.user.wallet.currencies) {
      const oldUserCurrency = (prevProps.user.wallet.currencies || []).find(
        (c) => c.symbol === this.props.community.currency.symbol,
      );
      const newUserCurrency = (this.props.user.wallet.curencies || []).find(
        (c) => c.symbol === this.props.community.currency.symbol,
      );

      if (newUserCurrency) {
        if (
          oldUserCurrency !== newUserCurrency &&
          +newUserCurrency.balance >=
            +this.props.community.currency.minimumStake
        ) {
          this.setState({ components: [StakeCommunity, ProcessTransaction] });
        }
      }
    }
  }

  render() {
    const { props } = this;
    return <Dialog components={this.state.components} {...props} />;
  }
}

export default CommunityStake;
