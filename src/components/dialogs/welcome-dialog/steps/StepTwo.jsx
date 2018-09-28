import React from 'react';

import styles from '../WelcomeDialog.css';

export default function StepTwo() {
  return (
    <div>
      <p>
        You will need Ethereum to interact with the Native Platform. Ethereum is
        a cryptocurrency that you can use to get Native Tokens.
      </p>
      <p>You can buy Ethereum by visiting either coinbase or MyCrypto.com</p>
      <a
        className={`${styles.CoinbaseButton} ${styles.WelcomeButton}`}
        target="_blank"
        rel="noopen nofollow"
        href="https://coinbase.com"
      >
        coinbase
      </a>

      <a
        className={`${styles.MyCryptoButton} ${styles.WelcomeButton}`}
        target="_blank"
        rel="noopen nofollow"
        href="https://mycrypto.com"
      >
        MyCrypto.com
      </a>
    </div>
  );
}
