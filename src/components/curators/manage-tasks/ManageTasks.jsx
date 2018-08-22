import React, { Component } from 'react';
import moment from 'moment';

import ManageTasksList from './ManageTasksList';
import ManageTasksNew from './ManageTasksNew';

import styles from './ManageTasks.css';

export class ManageTasks extends Component {
  state = {
    currentTasks: [],
    expandedTask: 0,
    pastTasks: [],
  };

  componentDidMount() {
    const currentTasks = this.props.items.filter((task) => {
      return moment(task.endDate).isAfter(moment());
    });
    const pastTasks = this.props.items.filter((task) => {
      return moment(task.endDate).isBefore(moment());
    });
    this.setState({
      currentTasks: currentTasks,
      pastTasks: pastTasks,
    });
  }

  expandListRow = (taskId) => {
    this.setState({
      expandedTask: taskId,
    });
  };

  render() {
    return (
      <div>
        <ManageTasksNew />
        <div className={styles.TableTitle}>
          <h2>Current Tasks</h2>
        </div>
        <ManageTasksList
          tasks={this.state.currentTasks}
          handleExpand={this.expandListRow}
          expandedTask={this.state.expandedTask}
        />
        <div className={styles.TableTitle}>
          <h2>Past Tasks</h2>
        </div>
        <ManageTasksList
          tasks={this.state.pastTasks}
          handleExpand={this.expandListRow}
          expandedTask={this.state.expandedTask}
        />
      </div>
    );
  }
}

export default ManageTasks;
