import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNewTribe } from '../../actions/allTribesActions';

import Loader from '../../components/shared/loader';
import ManageTribeForm from '../../components/forms/manage-tribe';

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
    this.props.addNewTribe(newVals);
  }

  render() {
    return this.props.isLoading ? (
      <Loader />
    ) : (
      <ManageTribeForm submitForm={this.handleSubmit.bind(this)} />
    );
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addNewTribe: bindActionCreators(addNewTribe, dispatch),
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
