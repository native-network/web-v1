import React from 'react';

function AuthenticatedStatus({ session }) {
  return <div>{session ? session : 'Unauthenticated'}</div>;
}

export default AuthenticatedStatus;
