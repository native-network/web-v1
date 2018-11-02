/* eslint-disable */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateCommunity } from '../../actions/communitiesActions';

import Loader from '../../components/shared/loader';
import ManageCommunityForm from '../../components/forms/manage-community';
import ManageCommunityPrivacyModal from '../../components/curators/manage-community-privacy';

export class Manage extends Component {
  handleSubmit(vals) {
    const { community } = this.props;
    const { membershipBenefits, blacklistAll } = vals;

    const newVals = {
      id: community.id,
      ...vals,
      membershipBenefits:
        membershipBenefits.filter((benefit) => !!benefit.length) || [],
      blacklistAll: blacklistAll === 'Blacklist'
    };

    this.props.updateCommunity(newVals);
  }

  render() {
    return this.props.isLoading ? (
      <Loader />
    ) : (
      <Fragment>
        <ManageCommunityForm
          community={this.props.community}
          submitForm={this.handleSubmit.bind(this)}
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
