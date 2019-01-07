import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import VoteResults from '../../../shared/vote-results';
import VoteForm from '../../../forms/vote/index';
import { submitVote } from '../../../../actions/voteActions';

import styles from './Vote.css';

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
          {isClosed ? 'Closed' : 'Closes'}:{' '}
          {moment(endDate).format('MMM Do, h:mm A')}
        </span>
        <p>{description}</p>
      </div>
      <div className={styles.VoteMeta}>
        {hasVoted || isClosed ? (
          <VoteResults votes={votes} options={options} />
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
