/*eslint-disable */
import React from 'react';
import styles from './CommunityPrivateUserRequest.css';
import Button from '../../shared/button';

const CommunityPrivateUserRequest = ({ community, user }) => {
  const { name } = community;
  const { address } = user;

  return (
    <form className={styles.form}>
      <h1>Join {name} Community</h1>
      <label>Please Enter your email</label>
      <input type="text" />

      <label>Wallet Address</label>
      <p className={styles.address}>{address}</p>

      <div className={styles.descriptionContainer}>
        <p>
          Please provide a short message describing why you would like to join
          our community.
        </p>
        <textarea />
        <span>280 Characters Max</span>
      </div>

      <div className={styles.buttonContainer}>
        <Button theme="primary" content="Request to Join Community" />
        <span>Cancel</span>
      </div>
    </form>
  );
};

export default CommunityPrivateUserRequest;
