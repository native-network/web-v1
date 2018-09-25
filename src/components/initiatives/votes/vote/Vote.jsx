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
    const percentage = Math.floor((o.votes.length / totalVotes) * 100);
    return (
      <div key={i} className={styles.VoteResults}>
        <h4>{o.name}</h4> <progress value={percentage} max="100" /> {percentage}
        % {o.votes.length} Total Votes
      </div>
    );
  });
}

function Vote({ vote, submitVote }) {
  const { description, hasVoted, title, options, endDate, votes } = vote;

  const handleSubmit = (optionId) => {
    submitVote(vote.id, optionId, vote.community.id);
  };

  return (
    <li className={styles.VoteItem}>
      <div className={styles.VoteImage}>
        <img src="http://placehold.it/250x150" alt="" />
      </div>
      <div className={styles.VoteDescription}>
        <h3>{title}</h3>
        <span className={styles.VoteClosing}>
          Closes: {moment(endDate).format('MMM Do, h:mm A')}
        </span>
        <p>{description}</p>
      </div>
      <div className={styles.VoteMeta}>
        {hasVoted ? (
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
