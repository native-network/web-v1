import React from 'react';
import { connect } from 'react-redux';

function AuthenticatedStatus(props) {
  return <div>{props.session || 'Unauthenticated'}</div>;
}
const connectStateToProps = (state) => {
  return {
    session: state.user.session,
  };
};

export default connect(connectStateToProps)(AuthenticatedStatus);
