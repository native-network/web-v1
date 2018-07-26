import React from 'react';

import styles from './Votes.css';

import Button from '../../shared/button';

function Votes({ items }) {
  const renderItem = ({
    index,
    name,
    description,
    voteCount,
    voteDeadline,
  }) => {
    return (
      <li className={styles.VoteItem} key={index}>
        <div className={styles.VoteImage}>
          <img src="http://placehold.it/250x150" alt="" />
          Total Votes: {voteCount}
        </div>
        <div className={styles.VoteDescription}>
          <h3>{name}</h3>
          <p>{description}</p>
          <form action="">
            Yes <input type="radio" />
            <br />
            No <input type="radio" />
            <br />
            <Button centered theme="secondary" content="Submit Vote" />
          </form>
        </div>
        <div className={styles.VoteMeta}>
          <h4>Vote Closes</h4>
          {voteDeadline}
        </div>
      </li>
    );
  };

  return (
    <div className={styles.Vote}>
      <div className={styles.Filter}>
        Filter by Vote Type
        <select defaultValue="all" name="" id="">
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <ul className={styles.VoteList}>
        {(items || []).map((item, i) => renderItem({ index: i, ...item }))}
      </ul>
    </div>
  );
}

export default Votes;
