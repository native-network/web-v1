/* eslint-disable */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateCommunity } from '../../actions/communitiesActions';

import Loader from '../../components/shared/loader';
import ManageCommunityForm from '../../components/forms/manage-community';

import Modal from '../../components/shared/modal';
import Button from '../../components/shared/button';

export class Manage extends Component {
  state = {
    isModalOpen: false,
  };

  handleSubmit(vals) {
    const { community } = this.props;
    const { membershipBenefits } = vals;
    // shoud get this data back from the backend.
    // mocking data here.
    this.props.community.privateCommunity = false;
    const newVals = {
      ...community,
      ...vals,
      membershipBenefits:
        membershipBenefits.filter((benefit) => !!benefit.length) || [],
    };

    // console.log('vals', vals.privateCommunity)
    // console.log('community', community.privateCommunity)

    this.props.updateCommunity(newVals);
  }

  handleClickPrivateCommunity(e) {
    const { value } = e.target;
    // value is the current value of privateCommunity in the db.
    // console.log('value', value);

    this.setState({ isModalOpen: true });
  }


  closeModal() {
    this.setState({ isModalOpen: false });
  }
  // clickHandler={this.openModal.bind(this)}
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
        <Modal
          hasCloseButton closeModal={this.closeModal.bind(this)}
          isOpen={this.state.isModalOpen}
        > 
        <ul>
          <li>Warning, you cannot change a private community to public at this time.</li>
          <li>By checking private community, only approved members can join.</li>
          <li>You will need to click save in community info In order for your community to become private</li>
          <li>Afterwords you will be redirected to community table, there you will be prompted with two options:</li>
          <ul>
            <li>Choose to approve all current members, and manually add individual users to the blacklist.</li>
            <li>Or blacklist all current members, and manually add individual users to the the whitelist</li>
          </ul>
        </ul>
          <Button theme="tertiary" content="Undo" />
          <Button theme="secondary" content="Continue"/>
        </Modal>
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
