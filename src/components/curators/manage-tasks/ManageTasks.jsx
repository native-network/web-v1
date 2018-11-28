import React, { Component, Fragment } from 'react';

import TasksTable from './components/tasks-table';
import CreateTaskModal from './components/create-task-modal';
import Button from '../../shared/button';

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
        <Button
          theme="secondary"
          content="Add Task"
          clickHandler={() => this.openModal()}
        />
        <CreateTaskModal
          communityId={this.props.communityId}
          closeModal={() => this.closeModal()}
          isModalOpen={this.state.isModalOpen}
        />
        <TasksTable {...this.props} />
      </Fragment>
    );
  }
}

export default ManageTasks;
