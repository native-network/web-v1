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

  // handleCommunityPrivacySubmit(e) {
  //   e.preventDefault()
  // }

  handleClickPrivateCommunity(e, value) {
    // const { value } = e.target;
    console.log('val',  e)
    console.log('preVal',value)
    this.setState({ isModalOpen: true });
    value = true
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  };
  //
  render() {
    // shoud get this data back from the backend.
    // mocking data here.
    this.props.community.privateCommunity = false;

    return this.props.isLoading ? (
      <Loader />
    ) : (
      <Fragment>
        <ManageCommunityForm
          community={this.props.community}
          submitForm={this.handleSubmit.bind(this)}
          clickPrivateCommunity={this.handleClickPrivateCommunity.bind(this)}
        />
        <ManageCommunityPrivacyModal
          isModalOpen={this.state.isModalOpen}
          closeModal={this.closeModal.bind(this)}
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
