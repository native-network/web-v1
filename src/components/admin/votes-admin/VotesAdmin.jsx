import React from 'react';

function VotesAdmin({ items }) {
  const renderItem = ({ index, name, description }) => {
    return (
      <li key={index}>
        <div>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </li>
    );
  };

  return (
    <ul>{(items || []).map((item, i) => renderItem({ index: i, ...item }))}</ul>
  );
}

export default VotesAdmin;
