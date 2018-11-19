import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNewTask } from '../../../../../actions/communityTasksActions';

import Loader from '../../../../shared/loader';
import Modal from '../../../../shared/modal';
import ManageTaskForm from '../../../../forms/manage-task';
import moment from 'moment';

import styles from './CreateTaskModal.css';

export class CreateTaskModal extends Component {
  handleSubmit(vals) {
    const newVals = {
      ...vals,
      communityId: this.props.communityId,
    };
    newVals.startDate = moment().toISOString();
    newVals.endDate = moment(vals.endDate, 'MM/DD/YYYY').toISOString();
    newVals.reward = +vals.reward;
    newVals.timeToComplete = +vals.timeToComplete;
    this.props.addNewTask(newVals);
  }

  render() {
    const { closeModal, isModalOpen } = this.props;

    return this.props.isLoading ? (
      <Loader />
    ) : (
      <div className={styles.PollButton}>
        <Modal
          renderHeader={() => (
            <div className={styles.ModalHeader}>
              <h1>Add Task</h1>
              <button style={{ color: 'black' }} onClick={() => closeModal()}>
                x
              </button>
            </div>
          )}
          label="Add Task"
          isOpen={isModalOpen}
        >
          <div>
            <ManageTaskForm submitForm={this.handleSubmit.bind(this)} />
          </div>
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
