import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from '../CommunityStake.css';

const furtherInstructionText = () => {
  return location.pathname && location.pathname !== '/dashboard' ? (
    <div>
      <p>Please visit the dashboard and purchase Native Community Currency.</p>
      <Link className={styles.Button} to="/dashboard">
        Go To Dashboard
      </Link>
    </div>
  ) : (
    <p>Please use the currency converter above.</p>
  );
};
function InsufficientFunds() {
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
        {furtherInstructionText()}
      </div>
    </div>
  );
}

export default connect((state) => {
  return {
    location: state.router.location,
  };
})(InsufficientFunds);
