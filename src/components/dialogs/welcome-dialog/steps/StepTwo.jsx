import React from 'react';
import styles from '../WelcomeDialog.css';
import MetamaskButton from '../shared/MetamaskButton';

export default function StepTwo() {
  return (
    <div>
      <p>
        MetaMask is required to use Native. MetaMask is a wallet extension for
        your browser that enables you to sign digital transactions, as well as
        sending/receiving cryptocurrencies.
      </p>
      <ul className={styles.FeatureList}>
        <li>
          When you sign into Native, your wallet verifies it’s you with a
          transaction that you sign &amp; approve.
        </li>
        <li>
          When you cast a vote on Native, your wallet signs your vote so we know
          that it's yours.
        </li>
        <li>
          When you complete a task, tokens you earn are sent to your wallet,
          where your tokens are held.
        </li>
      </ul>
      <MetamaskButton link="https://metamask.io" content="Install Metamask" />
    </div>
  );
}
