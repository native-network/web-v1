import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import VoteForm from '../../../forms/vote/index';
import { submitVote } from '../../../../actions/voteActions';

import styles from './Vote.css';

function renderVoteResults(votes, options) {
  const totalVotes = votes.length;
  return options.map((o, i) => {
    const percentage = Math.floor((o.votes.length / totalVotes) * 100) || 0;
    return (
      <div
        key={i}
        className={`${styles.VoteResults} ${
          styles[o.name.replace(/\s+/g, '')]
        }`}
      >
        <span className={styles.ResultsLabel}>
          {o.name} ({percentage}
          %)
        </span>
        <svg
          className={`${styles.Progress} ${styles[o.name.replace(/\s+/g, '')]}`}
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <rect x="0" width={`${percentage}%`} />
        </svg>
      </div>
    );
  });
}

function Vote({ vote, submitVote }) {
  const today = moment();
  const isClosed = moment(vote.endDate).isBefore(today);
  const {
    description,
    hasVoted,
    title,
    options,
    endDate,
    votes,
    fileUrl,
  } = vote;

  const handleSubmit = (optionId) => {
    submitVote(vote.id, optionId, vote.community.id);
  };

  return (
    <li className={styles.VoteItem}>
      {!fileUrl ? null : (
        <div className={styles.VoteImage}>
          <img src={fileUrl} alt="" />
        </div>
      )}
      <div className={styles.VoteDescription}>
        <h3>{title}</h3>
        <span className={styles.VoteClosing}>
          Closes: {moment(endDate).format('MMM Do, h:mm A')}
        </span>
        <p>{description}</p>
      </div>
      <div className={styles.VoteMeta}>
        {hasVoted || isClosed ? (
          renderVoteResults(votes, options)
        ) : (
          <VoteForm submitForm={handleSubmit} options={options} />
        )}
      </div>
    </li>
  );
}

export function mapDispatchToProps(dispatch) {
  return {
    submitVote: bindActionCreators(submitVote, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(Vote);
