import React from 'react';

export default function TabNavigation ({items, clickHandler}) {
  console.log(items);
  return (
    <ul>
      {(items || []).map(({name}, i) => {
        return (
          <li onClick={() => clickHandler(i)} key={i}>{name}</li>
        );
      })}
    </ul>
  );
}
