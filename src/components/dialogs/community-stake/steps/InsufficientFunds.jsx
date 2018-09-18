import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../CommunityStake.css';

function InsufficientFunds() {
  return (
    <div className={styles.CommunityStake}>
      <h1 className={styles.Header}>Purchase Native Community Currency</h1>
      <div className={styles.TextContainer}>
        <p>
          <strong>
            In order to join a tribe, you must first purchase Native Community
            Currency (NTV). Once you have Native Currency, you can use that to
            purchase the community currency of your choice and join that
            community.
          </strong>
        </p>
        <p>
          Please visit the dashboard and purchase Native Community Currency.
        </p>

        <Link className={styles.Button} to="/dashboard">
          Go To Dashboard
        </Link>
      </div>
    </div>
  );
}

export default InsufficientFunds;
