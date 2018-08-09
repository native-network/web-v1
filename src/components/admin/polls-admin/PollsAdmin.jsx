import React from 'react';

import AddPoll from './AddPoll';

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
      <div key={index}>
        <div>
          <p>Title: {title}</p>
        </div>
        <div>
          <p>Question: {question}</p>
        </div>
        <div>
          <p>Start Date: {startDate}</p>
        </div>
        <div>
          <p>End Date: {endDate}</p>
        </div>
        <div>
          <p>Total Votes: {votes.length}</p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <AddPoll />
      <div>
        {(items || []).map((item, i) => renderItem({ index: i, ...item }))}
      </div>
    </div>
  );
}

export default PollsAdmin;
