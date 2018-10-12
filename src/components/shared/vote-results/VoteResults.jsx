import React, { Fragment } from 'react';

import styles from './VoteResults.css';

function VoteResults({ votes, options }) {
  const totalVotes = votes.length;
  const maxVotes = options.reduce(
    (prev, current) =>
      prev.votes && prev.votes.length > current.votes.length ? prev : current,
  );

  const isMaxTied =
    options.filter((option) => option.votes.length === maxVotes.votes.length)
      .length > 1;

  return (
    <div className={styles.ResultsContainer}>
      {options.map((o, i) => {
        const percentage = Math.floor((o.votes.length / totalVotes) * 100) || 0;
        return (
          <Fragment key={i}>
            <span
              className={`${styles.ResultsLabel} ${
                maxVotes === o && !isMaxTied ? styles.Winner : styles.Loser
              }`}
            >
              {o.name} ({percentage}
              %)
            </span>
            <svg
              className={`${styles.Progress} ${
                maxVotes === o && !isMaxTied ? styles.Winner : styles.Loser
              }`}
              viewBox="0 0 10 10"
              preserveAspectRatio="none"
            >
              <rect x="0" width={`${percentage}%`} />
            </svg>
          </Fragment>
        );
      })}
    </div>
  );
}

export default VoteResults;
