import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNewTask } from '../../../../../actions/communityTasksActions';

import Modal from '../../../../shared/modal';
import ManageTaskForm from '../../../../forms/manage-task';
import moment from 'moment';

import styles from './CreateTaskModal.css';

export class CreateTaskModal extends Component {
  handleSubmit = (vals) => {
    const newVals = {
      ...vals,
      communityId: this.props.communityId,
    };
    newVals.startDate = moment().toISOString();
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
          <ManageTaskForm submitForm={this.handleSubmit} />
        </Modal>
      </div>
    );
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    addNewTask: bindActionCreators(addNewTask, dispatch),
  };
};

export default connect(
  (state) => {
    return {
      isLoading: state.loading > 0,
    };
  },
  mapDispatchToProps,
)(CreateTaskModal);
