import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getWeb3ServiceInstance } from '../../../../web3/Web3Service';

import Button from '../../../shared/button';

import styles from '../CommunityStake.css';
const { web3 } = getWeb3ServiceInstance();

const { fromWei } = web3.utils;

const furtherInstructionText = (populateNativeBalance, dismissDialog) => {
  return location.pathname && location.pathname !== '/dashboard' ? (
    <div>
      <p>Please visit the dashboard and purchase Native Community Currency.</p>
      <Link className={styles.Button} to="/dashboard">
        Go To Dashboard
      </Link>
    </div>
  ) : (
    <Fragment>
      <p>Please use the currency converter above.</p>
      <Button
        className={styles.DismissButton}
        clickHandler={() => populateNativeBalance()}
        theme="primary"
        content="Convert NTV Tokens"
      />
      <br />
      <Button
        clickHandler={() => dismissDialog()}
        theme="link"
        content="Dismiss"
      />
    </Fragment>
  );
};
function InsufficientFunds({
  populateNativeBalance,
  dismissDialog,
  user,
  community,
}) {
  const userCurrency = user.wallet.currencies.find(
    (currency) => currency.symbol === community.currency.symbol,
  );
  const userBalance = userCurrency && userCurrency.balance;
  const minStake = community.currency.minimumStake;
  const nativeCurrency = user.wallet.currencies.find((c) => c.symbol === 'NTV');

  return (
    <div className={styles.CommunityStake}>
      <h1 className={styles.Header}>Get Native Tokens</h1>
      <div className={styles.TextContainer}>
        <p>
          <strong>
            In order to join a community, you must first purchase Native Tokens
            (NTV). Once you have Native Tokens, you can use that to purchase the
            community tokens of your choice and join that community.
          </strong>
        </p>
        <p>
          It appears you don't have enough NTV to convert to{' '}
          {community.currency.symbol} needed to stake into the {community.name}{' '}
          Community. You need a minimum of {fromWei(minStake)}{' '}
          {community.currency.symbol} to stake into the community. Your current
          balance is {fromWei(userBalance)} {community.currency.symbol} and{' '}
          {fromWei(nativeCurrency.balance)} {nativeCurrency.symbol}.
        </p>
        {furtherInstructionText(populateNativeBalance, dismissDialog)}
      </div>
    </div>
  );
}

export default connect((state) => {
  return {
    location: state.router.location,
  };
})(InsufficientFunds);
