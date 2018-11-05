import React from 'react';

import styles from '../WelcomeDialog.css';

export default function StepOne() {
  return (
    <div>
      <p>
        Native is a platform for Communities to created tokenized ecosystems on
        the blockchain. Native Tokens (NTV) are used to join and participate in
        communities by converting them into a Community’s Token.
      </p>
      <p>
        Community Tokens are used to become a member of a Community and can also
        be used to transact value.
      </p>
      <p>
        <strong>Joining a community allows you to:</strong>
      </p>
      <ul className={styles.FeatureList}>
        <li>Vote on important decisions</li>
        <li>
          Decide which projects will be funded through the Community’s Fund
        </li>
        <li>
          Earn both Community and Native tokens by completing tasks created by
          the Community Curator
        </li>
      </ul>
    </div>
  );
}
