import React, { Component } from 'react';
import BigNumber from 'bignumber.js';

import CurrencyConverter from '../../../forms/currency-converter';
import { getWeb3ServiceInstance } from '../../../../web3/Web3Service';
import { bigNumber } from '../../../../utils/helpers';

const { web3 } = getWeb3ServiceInstance();

const { fromWei } = web3.utils;

import styles from '../CommunityStake.css';

export class ConvertCurrency extends Component {
  handleSubmit(symbol, address, value) {
    const { submitHandler, community } = this.props;

    community.submitTransaction(symbol, address, value);
    submitHandler();
  }

  render() {
    const { user, community } = this.props;
    const userCommunity = user.wallet.currencies.find(
      (c) => c.symbol === community.currency.symbol,
    );
    const userMemberOf = user.memberOf.find((c) => c.id === community.id);
    const minRequirementValidator = (value) =>
      parseInt(value, 10) <
        +fromWei(
          bigNumber(
            community.currency.minimumStake - userCommunity.balance,
          ).toString(),
        ) && !userMemberOf
        ? `You don't have enough to stake`
        : undefined;
    const minRequirement = userMemberOf
      ? fromWei(community.currency.minimumStake)
      : community.currency &&
        fromWei(
          bigNumber(
            community.currency.minimumStake - userCommunity.balance,
          ).toString(),
        );
    return (
      <div className={styles.CommunityStake}>
        <h1 className={styles.Header}>
          Get {community.name} Community Currency
        </h1>
        <div className={styles.TextContainer}>
          <p>
            <strong>
              You must convert ETH or another Bancor or community currency to{' '}
              {community.name} Community Currency ({community.currency.symbol})
              in order to support the community.
            </strong>
          </p>
          <p>
            When you support a community, you are investing in that community.
            You can participate in activities by joining the community.
          </p>
          <p>Select the currency and amount you would like to convert below.</p>
          <p>
            <strong>
              This transaction could take up to 5 minutes. You will be notified
              when your currency has been transferred.
            </strong>
          </p>
        </div>
        <CurrencyConverter
          className={styles.ModalConverter}
          defaultValues={{
            sendCurrency: user.wallet.currencies.find(
              (c) => c.symbol === 'NTV',
            ),
            sendValue: new BigNumber(minRequirement || 1)
              .dividedBy((community.currency && community.currency.price) || 1)
              .toString(),
            receiveCurrency: community.currency,
            receiveValue: minRequirement,
          }}
          sendCurrencies={[]}
          receiveCurrencies={[community.currency]}
          toValidation={minRequirementValidator}
          submitHandler={this.handleSubmit.bind(this)}
        />
      </div>
    );
  }
}

export function mapDispatchToProps() {}

export default ConvertCurrency;
