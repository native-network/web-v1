import React from 'react';

function AuthenticatedStatus({ user }) {
  return <div>{user.id ? user.address : 'Unauthenticated'}</div>;
}

export default AuthenticatedStatus;
