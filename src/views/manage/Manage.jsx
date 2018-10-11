import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateCommunity } from '../../actions/communitiesActions';

import Loader from '../../components/shared/loader';
import ManageCommunityForm from '../../components/forms/manage-community';

export class Manage extends Component {
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

  render() {
    return this.props.isLoading ? (
      <Loader />
    ) : (
      <ManageCommunityForm
        community={this.props.community}
        submitForm={this.handleSubmit.bind(this)}
      />
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
