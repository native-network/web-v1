import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { claimTask, submitTask } from '../../../actions/communityTasksActions';
import styles from './Tasks.css';

import Modal from '../../shared/modal';
import Button from '../../shared/button';
import S3Image from '../../shared/s3-image';
import UserTaskForm from '../../forms/user-task';

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

  handleSubmitTask = (values) => {
    const taskId = this.props.id;
    const { email, comments } = values;

    this.props.submitTask({ taskId, email, comments });
    this.closeModal();
  };

  render() {
    const { index, ...item } = this.props;
    const {
      title,
      description,
      claimedBy,
      status,
      imageUrl,
      reward,
      timeToComplete,
    } = item;
    const isClaimedUser = claimedBy === this.props.user.id;

    return (
      <li className={styles.TaskItem} key={index}>
        {imageUrl && imageUrl !== 'null' ? (
          <div className={styles.TaskImage}>
            <S3Image fileName={imageUrl} />
          </div>
        ) : null}
        <div className={styles.TaskDescription}>
          <h3>{title}</h3>
          <p>{description}</p>
          <Modal
            isOpen={this.state.isModalOpen}
            hasCloseButton
            label={`${isClaimedUser ? 'Submit' : 'Claim'} Task`}
            renderHeader={() => (
              <h1>
                Are you sure you want to {isClaimedUser ? 'submit' : 'claim'}{' '}
                this task?
              </h1>
            )}
            closeModal={this.closeModal}
          >
            {status === 'escrowed' ? (
              <p>
                Once you claim this task, no one else will be able to claim it.
                Please submit your email address and a few comments about why
                you are qualified to complete this task.
              </p>
            ) : (
              <p>
                Once the task has been submitted, the curator will review your
                work. Please provide any relevant information to help the
                curator decide whether your work meets the necessary conditions
                to consider this work complete.
              </p>
            )}
            <UserTaskForm
              isSubmission={isClaimedUser}
              task={item}
              user={this.props.user}
              handleSubmit={(values) =>
                isClaimedUser
                  ? this.handleSubmitTask(values)
                  : this.handleTaskClaim(values)
              }
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
            content={isClaimedUser ? 'Submit Work' : 'Claim Task'}
            disabled={
              ((status === 'claimed' || status === 'pendingApproval') &&
                !isClaimedUser) ||
              (isClaimedUser && status === 'pendingApproval')
            }
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
    submitTask: bindActionCreators(submitTask, dispatch),
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
