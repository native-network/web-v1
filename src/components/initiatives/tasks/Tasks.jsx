import React from 'react';

function Tasks ({items}) {
  console.log(items);
  return (
    <div>{JSON.stringify(items)}</div>
  );
}

export default Tasks;
