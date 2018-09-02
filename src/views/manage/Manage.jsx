import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNewCommunity } from '../../actions/allCommunitiesActions';

import Loader from '../../components/shared/loader';
import ManageCommunityForm from '../../components/forms/manage-community';

export class Manage extends Component {
  handleSubmit(vals) {
    const newVals = {
      ...vals,
      address: '0x3imaginalfilms',
      tokenAddress: 'foo',
      loggerAddress: 'foo',
      subtitle: 'Foo',
      image: 'static/media/cloud_header.png',
      icon: 'static/media/cloud_header.png',
      dataImage: 'static/media/cloud_header.png',
    };
    this.props.addNewCommunity(newVals);
  }

  render() {
    return this.props.isLoading ? (
      <Loader />
    ) : (
      <ManageCommunityForm submitForm={this.handleSubmit.bind(this)} />
    );
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addNewCommunity: bindActionCreators(addNewCommunity, dispatch),
  };
};

export default connect(
  (state) => {
    return {
      isLoading: state.loading > 0,
    };
  },
  mapDispatchToProps,
)(Manage);
