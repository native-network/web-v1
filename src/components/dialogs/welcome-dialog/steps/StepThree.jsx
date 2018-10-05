import React from 'react';
import styles from '../WelcomeDialog.css';

export default function StepThree() {
  return (
    <div>
      <p>
        You will need some Ethereum in your wallet. Ethereum is a base
        cryptocurrency that you can use to get other cryptocurrencies like
        Native Tokens.
      </p>
      <p className={styles.Important}>Once you have some Ethereum, you can :</p>
      <ul className={styles.FeatureList}>
        <li>- Get Native tokens</li>
        <li>- Convert Native tokens into Community tokens</li>
        <li>- Join and participate in Communities</li>
      </ul>
      <br />

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
