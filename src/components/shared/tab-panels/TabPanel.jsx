import React from 'react';

export default function TabPanel({render}) {
  return (
    <div className="container">{render()}</div>
  );
}
