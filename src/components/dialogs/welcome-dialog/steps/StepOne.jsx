import React from 'react';

import MetamaskButton from '../shared/MetamaskButton';

import styles from '../WelcomeDialog.css';

export default function StepOne() {
  return (
    <div>
      <p>
        Native is a platform for communities to realize their inherent value
        through local currency and set of governance tools.
      </p>
      <p className={styles.Important}>
        Metamask is required to interact with the Native Platform.
      </p>
      <MetamaskButton
        link="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
        content="Download Metamask"
      />
    </div>
  );
}
