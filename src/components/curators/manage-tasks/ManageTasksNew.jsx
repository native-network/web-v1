import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addNewTask } from '../../../actions/communityTasksActions';

import Loader from '../../shared/loader';
import Button from '../../shared/button';
import Modal from '../../shared/modal';
import ManageTaskForm from '../../forms/manage-task';
import moment from 'moment';

import styles from './ManageTasks.css';

export class ManageTasksNew extends Component {
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
    newVals.endDate = moment(vals.endDate, 'MM/DD/YYYY').toISOString();
    newVals.reward = +vals.reward;
    newVals.timeToComplete = +vals.timeToComplete;
    this.props.addNewTask(newVals);
  }

  render() {
    return this.props.isLoading ? (
      <Loader />
    ) : (
      <div className={styles.PollButton}>
        <Button
          theme="secondary"
          content="Add Task"
          clickHandler={this.openModal.bind(this)}
          disabled={true}
        />
        <Modal
          renderHeader={() => (
            <div className={styles.ModalHeader}>
              <h1>Add Task</h1>
              <button
                style={{ color: 'black' }}
                onClick={this.closeModal.bind(this)}
              >
                x
              </button>
            </div>
          )}
          label="Add Task"
          isOpen={this.state.isModalOpen}
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
)(ManageTasksNew);
