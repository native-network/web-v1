import React, { Component } from 'react';
import PropTypes from 'prop-types';

import StepOne from './steps/StepOne';
import StepTwo from './steps/StepTwo';
import StepThree from './steps/StepThree';

// import InsufficientFunds from './steps/InsufficientFunds';

import Dialog from '../Dialog';

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

    // const userNativeCurrency = user.wallet.currencies.find(
    //   c => c.symbol === 'NTV'
    // );

    if (
      userCurrency &&
      userCurrency.balance >= community.currency.minimumStake
    ) {
      this.setState({ components: [StepThree] });
    } else {
      this.setState({ components: [StepOne, StepTwo, StepThree] });
    }

    // if (new BigNumber(userNativeCurrency.balance)
    // .dividedBy(community.currency && community.currency.price)
    // .multipliedBy(community.currency && community.currency.minimumStake)
    // .toString() < community.currency && community.currency.minimumStake) {
    //   this.setState({ components: [InsufficientFunds]});
    // }
  }

  render() {
    const { props } = this;
    return <Dialog components={this.state.components} {...props} />;
  }
}

export default CommunityStake;
