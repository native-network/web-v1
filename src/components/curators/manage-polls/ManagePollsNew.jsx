import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNewPoll } from '../../../actions/communityPollsActions';

import Loader from '../../shared/loader';
import Button from '../../shared/button';
import Modal from '../../shared/modal';
import ManagePollForm from '../../forms/manage-poll';
import moment from 'moment';

import styles from './ManagePolls.css';

export class ManagePollsNew extends Component {
  state = {
    isModalOpen: false,
  };

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  handleSubmit(vals) {
    const newVals = {
      ...vals,
      communityId: this.props.communityId,
    };
    newVals.startDate = moment().toISOString();
    newVals.endDate = moment()
      .add(+vals.endDate, 'days')
      .toISOString();
    newVals.options = vals.options.filter((option) => option);

    this.props.addNewPoll(newVals);
  }

  render() {
    return this.props.isLoading ? (
      <Loader />
    ) : (
      <div className={styles.PollButton}>
        <Button
          theme="secondary"
          content="Add Poll"
          clickHandler={this.openModal.bind(this)}
        />
        <Modal
          hasCloseButton
          closeModal={this.closeModal.bind(this)}
          renderHeader={() => <h1>Add Poll</h1>}
          label="Add Poll"
          isOpen={this.state.isModalOpen}
        >
          <div>
            <ManagePollForm
              submitForm={this.handleSubmit.bind(this)}
              communityId={this.props.communityId}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addNewPoll: bindActionCreators(addNewPoll, dispatch),
  };
};

export default connect(
  (state) => {
    return {
      isLoading: state.loading > 0,
    };
  },
  mapDispatchToProps,
)(ManagePollsNew);
