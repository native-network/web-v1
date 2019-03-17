import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNewTask } from '../../../../../actions/communityTasksActions';
import { getCommunityDevFund } from '../../../../../actions/communitiesActions';

import Modal from '../../../../shared/modal';
import ManageTaskForm from '../../../../forms/manage-task';
import moment from 'moment';

import styles from './CreateTaskModal.css';

export class CreateTaskModal extends Component {
  state = { availableDevFund: 0 };

  componentDidMount = () => {
    this.props.getCommunityDevFund(this.props.community);
  };

  handleSubmit = (vals) => {
    const newVals = {
      ...vals,
      communityId: this.props.community.id,
    };
    newVals.startDate = moment(vals.startDate, 'MM/DD/YYYY').toISOString();
    newVals.endDate = moment(vals.endDate, 'MM/DD/YYYY').toISOString();
    newVals.reward = +vals.reward;
    newVals.timeToComplete = +vals.timeToComplete;
    this.props.addNewTask(newVals);
  };

  render() {
    const { closeModal, isModalOpen } = this.props;

    return (
      <div className={styles.PollButton}>
        <Modal
          renderHeader={() => <h1>Add Task</h1>}
          closeModal={closeModal}
          hasCloseButton
          label="Add Task"
          isOpen={isModalOpen}
        >
          <ManageTaskForm
            devFund={this.props.devFund}
            submitForm={this.handleSubmit}
          />
        </Modal>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addNewTask: bindActionCreators(addNewTask, dispatch),
    getCommunityDevFund: bindActionCreators(getCommunityDevFund, dispatch),
  };
};

export default connect(
  (state) => {
    const community = state.communities.communities.find((c) => c.active);

    return {
      isLoading: state.loading > 0,
      devFund: community && community.currency.devFund,
    };
  },
  mapDispatchToProps,
)(CreateTaskModal);
