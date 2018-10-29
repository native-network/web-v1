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
    initialLoad: false,
    list: null,
    privateSelected: false,
  };

  handleSubmit(vals) {
    const { community } = this.props;
    const { membershipBenefits } = vals;

    const newVals = {
      ...community,
      ...vals,
      membershipBenefits:
        membershipBenefits.filter((benefit) => !!benefit.length) || [],
    };
    this.props.updateCommunity(newVals);
  }

  handleSubmitModal(e) {
    e.preventDefault();
    this.setState({ list: e.target.list.value });
    this.setState({ privateSelected: true });
    this.props.community.privateCommunity = true;
    this.closeModal();
  }

  handleUndoModal(e) {
    e.preventDefault();
    this.props.community.privateCommunity = false;
    this.closeModal();
  }

  handleClickPrivateCommunity(value) {
    if (value) {
      this.setState({ isModalOpen: true });
    }
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    this.props.community.privateCommunity = !!this.props.community
      .privateCommunity;
    return this.props.isLoading ? (
      <Loader />
    ) : (
      <Fragment>
        <ManageCommunityForm
          community={this.props.community}
          submitForm={this.handleSubmit.bind(this)}
          clickPrivateCommunity={this.handleClickPrivateCommunity.bind(this)}
          list={this.state.list}
          privateSelected={this.state.privateSelected}
        />
        <ManageCommunityPrivacyModal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal.bind(this)}
          handleSubmit={this.handleSubmitModal.bind(this)}
          handleUndo={this.handleUndoModal.bind(this)}
        />
      </Fragment>
    );
  }
}
// submitForm={this.handleCommunityPrivacySubmit.bind(this)}

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
