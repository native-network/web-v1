import React from 'react';

import AddVote from './AddVote';

function VotesAdmin({ items }) {
  const renderItem = ({ index, name, description, startDate, endDate }) => {
    return (
      <div key={index}>
        <div>
          <p>{name}</p>
        </div>
        <div>
          <p>{description}</p>
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
      <AddVote />
      <div>
        {(items || []).map((item, i) => renderItem({ index: i, ...item }))}
      </div>
    </div>
  );
}

export default VotesAdmin;
