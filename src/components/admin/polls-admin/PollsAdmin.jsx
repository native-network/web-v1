import React from 'react';

import AddPoll from './AddPoll';

function PollsAdmin({ items }) {
  const renderItem = ({ index, title, question, startDate, endDate }) => {
    return (
      <div key={index}>
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
