import React from 'react';
import styles from '../WelcomeDialog.css';

export default function StepThree() {
  return (
    <div>
      <p>
        You will need some Ether (ETH) in your wallet to send transactions and
        use Native. ETH is a base cryptocurrency that you can use to get other
        cryptocurrencies like Native Tokens.
      </p>
      <p className={styles.Important}>Once you have some ETH, you can:</p>
      <ul className={styles.FeatureList}>
        <li>Get Native tokens</li>
        <li>Convert Native tokens into Community Tokens</li>
        <li>Join and participate in Communities</li>
      </ul>

      <p>You can buy ETH by visiting either Coinbase or MyCrypto</p>

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
        href="https://buy.mycrypto.com"
      >
        MyCrypto
      </a>
    </div>
  );
}
