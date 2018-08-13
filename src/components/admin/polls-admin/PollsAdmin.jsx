import React from 'react';

import AddPoll from './AddPoll';

import styles from './PollsAdmin.css';

function PollsAdmin({ items }) {
  const renderItem = ({
    index,
    title,
    question,
    startDate,
    endDate,
    votes,
  }) => {
    return (
      <div key={index} className={styles.Table}>
        <div>
          <p>{title}</p>
        </div>
        <div>
          <p>{question}</p>
        </div>
        <div>
          <p>{startDate}</p>
        </div>
        <div>
          <p>{endDate}</p>
        </div>
        <div>
          <p>{votes.length} Total Votes</p>
          <p>14 Yes 70%</p>
          <p>6 Yes 30%</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <AddPoll />
      <div className={styles.TableTitle}>
        <h1>Current Polls</h1>
      </div>
      <div className={styles.Table}>
        <div>
          <p>Title</p>
        </div>
        <div>
          <p>Question</p>
        </div>
        <div>
          <p>Start Date</p>
        </div>
        <div>
          <p>End Date</p>
        </div>
        <div>
          <p>Status</p>
        </div>
      </div>
      {(items || []).map((item, i) => renderItem({ index: i, ...item }))}
    </div>
  );
}

export default PollsAdmin;
