/*eslint-disable */
import React from 'react';
import styles from './PrivateCommunityRequest.css';

const PrivateCommunityRequest = ({ community, user }) => {
  const { name } = community;
  const { address } = user;


  return (
    <form className={styles.form}>
      <h1>Join {name} Community</h1>
      <label>Please Enter your email</label>
      <input type="text" />

      <label>Wallet Address</label>
      <p>{address}</p>

      <p>
        Please provide a short message describing why you would like to join our
        community.
      </p>
      <textarea />
      
      <button>Request to Join</button>
      <a>Cancel</a>
    </form>
  );
};
{
  /* <span>{wallet}</span> */
}

export default PrivateCommunityRequest;
