import React, { Component } from 'react';
import { connect } from 'react-redux';

import EditProfile from '../../components/forms/edit-profile';

export class Settings extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="container">
        <h1>Settings</h1>
        <EditProfile user={user} updateUser={() => alert('foo!')} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
  }),
  null,
)(Settings);
