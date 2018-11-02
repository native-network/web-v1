/* eslint-disable */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateCommunity } from '../../actions/communitiesActions';

import Loader from '../../components/shared/loader';
import ManageCommunityForm from '../../components/forms/manage-community';
import ManageCommunityPrivacyModal from '../../components/curators/manage-community-privacy';

export class Manage extends Component {
  state = {
    isModalOpen: false,
    list: '',
    formPCSelectedTouched: false,
  };

  handleSubmit(vals) {
    const { community } = this.props;
    const { membershipBenefits } = vals;
    const { list } = this.state;

    const blacklistAll = list === 'Blacklist';

    const newVals = {
      ...community,
      ...vals,
      membershipBenefits:
        membershipBenefits.filter((benefit) => !!benefit.length) || [],
    };
    this.props.updateCommunity(newVals, blacklistAll);
  }

  handleSubmitModal(e) {
    e.preventDefault();
    this.setState({ list: e.target.list.value });
    this.setState({ formPCSelectedTouched: true });
    // console.log('this.state', this.state)
    this.closeModal();
  }

  handleUndoModal(e) {
    e.preventDefault();
    this.setState({
      list: '',
      formPCSelectedTouched: false,
    });
    this.closeModal();
  }

  handleClickPrivateCommunity(value) {
    if (value) {
      this.setState({ isModalOpen: true });
    }

    this.setState({ list: '' });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    return this.props.isLoading ? (
      <Loader />
    ) : (
      <Fragment>
        <ManageCommunityForm
          community={this.props.community}
          submitForm={this.handleSubmit.bind(this)}
          // clickPrivateCommunity={this.handleClickPrivateCommunity.bind(this)}
          list={this.state.list}
        />
      </Fragment>
    );
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    updateCommunity: bindActionCreators(updateCommunity, dispatch),
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
