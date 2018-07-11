import React from 'react';
import { Link } from 'react-router-dom';

function FourOhFour () {
  return (
    <div className="container">
      Something went wrong. <Link to="/">Go back home.</Link>
    </div>
  );
}

export default FourOhFour;
