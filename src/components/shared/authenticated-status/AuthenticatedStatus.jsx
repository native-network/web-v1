import React from 'react';

function AuthenticatedStatus(props) {
  return <div>{props.session ? props.session.address : 'Unauthenticated'}</div>;
}

export default AuthenticatedStatus;
