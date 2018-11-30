import React, { Component, Fragment } from 'react';

import TasksTable from './components/tasks-table';
import CreateTaskModal from './components/create-task-modal';
import Button from '../../shared/button';

import styles from './ManageTasks.css';

export class ManageTasks extends Component {
  state = {
    isModalOpen: false,
  };

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    return (
      <Fragment>
        <div className={styles.header}>
          <h2>Tasks</h2>
          <Button
            theme="secondary"
            content="Add Task"
            clickHandler={() => this.openModal()}
          />
        </div>
        <CreateTaskModal
          communityId={this.props.communityId}
          closeModal={() => this.closeModal()}
          isModalOpen={this.state.isModalOpen}
        />
        <TasksTable tasks={this.props.items} />
      </Fragment>
    );
  }
}

export default ManageTasks;
