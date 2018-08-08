import React from 'react';

import MetamaskButton from '../shared/MetamaskButton';

import styles from '../WelcomeDialog.css';

export default function StepTwo() {
  return (
    <div>
      <p className={styles.Important}>
        Hmm. It looks like you don't have any Ethereum in your wallet.
      </p>
      <p>
        You need Ethereum to interact with the Native Platform. Ethereum is a
        cryptocurrency that you can use to buy Native Tokens.
      </p>
      <p>You can buy Ethereum using your Metamask wallet, or visit Coinbase.</p>
      <MetamaskButton
        clickHandler={() => alert('Clicked!')}
        content="Open Metamask Wallet"
      />
      <br />
      <a
        className={`${styles.CoinbaseButton} ${styles.WelcomeButton}`}
        target="_blank"
        rel="noopen nofollow"
        href="https://coinbase.com"
      >
        coinbase
      </a>
    </div>
  );
}
