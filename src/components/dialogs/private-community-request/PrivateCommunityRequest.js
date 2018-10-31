/*eslint-disable */
import React from 'react';
import styles from './PrivateCommunityRequest.css';

const PrivateCommunityRequest = ({community, user}) => {
  const { name } = community
  const { address } = user

//   console.log('user', wallet)

  return  (
      <div className={styles.content}>
        <h1>Join {name} Community</h1>
        <label>Please Enter your email</label>
        <input type="text" />

        <label>{address}</label>

        <p>Please provide a short message describing why you would like to join our community.</p>
        <textarea></textarea>

        <button>Request to Join</button>
        <a>Cancel</a>
        </div>
  )
};
{/* <span>{wallet}</span> */}

export default PrivateCommunityRequest;
