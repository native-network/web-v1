import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { claimTask } from '../../../actions/communityTasksActions';
import styles from './Tasks.css';

import Modal from '../../shared/modal';
import Button from '../../shared/button';
import ClaimTaskForm from '../../forms/claim-task';

export class TaskItem extends Component {
  state = { isModalOpen: false };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleTaskClaim = (values) => {
    const taskId = this.props.id;
    const { email, comments } = values;

    this.props.claimTask({ taskId, email, comments });
    this.closeModal();
  };

  render() {
    const { index, ...item } = this.props;

    const {
      title,
      description,
      status,
      imageUrl,
      reward,
      timeToComplete,
    } = item;
    return (
      <li className={styles.TaskItem} key={index}>
        {imageUrl ? (
          <div className={styles.TaskImage}>
            <img src={imageUrl} alt="" />
          </div>
        ) : null}
        <div className={styles.TaskDescription}>
          <h3>{title}</h3>
          <p>{description}</p>
          <Modal
            isOpen={this.state.isModalOpen}
            hasCloseButton
            label="Claim Task"
            renderHeader={() => (
              <h1>Are you sure you want to claim this task?</h1>
            )}
            closeModal={this.closeModal}
          >
            <p>
              Once you claim this task, no one else will be able to claim it.
              Please submit your email address and a few comments about why you
              are qualified to complete this task.
            </p>
            <ClaimTaskForm
              user={this.props.user}
              handleSubmit={this.handleTaskClaim}
            />
            <Button
              theme="link"
              centered
              clickHandler={this.closeModal}
              content="Cancel"
            />
          </Modal>
        </div>
        <div className={styles.TaskMeta}>
          <h4>Reward:</h4>
          <p>{reward} NTV</p>
          <h4>Time to Complete:</h4>
          <p>
            You will have {timeToComplete}{' '}
            {timeToComplete === 1 ? 'day' : 'days'} to complete this task
          </p>
          <Button
            theme="secondary"
            content="Claim Task"
            disabled={status === 'claimed'}
            clickHandler={this.openModal}
          />
        </div>
      </li>
    );
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    claimTask: bindActionCreators(claimTask, dispatch),
  };
};

export default connect(
  (state) => {
    return {
      user: state.user,
    };
  },
  mapDispatchToProps,
)(TaskItem);
