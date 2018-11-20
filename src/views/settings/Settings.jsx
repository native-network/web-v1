import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from '../../components/shared/loader';
import EditProfile from '../../components/forms/edit-profile';

export class Settings extends Component {
  render() {
    const { user, isLoading } = this.props;
    return isLoading ? (
      <Loader />
    ) : (
      <div className="container">
        <h1>Settings</h1>
        <EditProfile user={user} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    user: state.user,
    isLoading: state.loading > 0,
  }),
  null,
)(Settings);
