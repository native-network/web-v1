import React, { Component } from 'react';
// import moment from 'moment';

import styles from './ManageTasks.css';

export class ManageTasks extends Component {
  state = {
    currentTasks: [],
    pastTasks: [],
  };

  componentDidMount() {
    // const currentTasks = this.props.items.filter((project) => {
    //   return moment(project.endDate).isAfter(moment());
    // });
    // const pastTasks = this.props.items.filter((project) => {
    //   return moment(project.endDate).isBefore(moment());
    // });
    // this.setState({
    //   currentTasks: currentTasks,
    //   pastTasks: pastTasks,
    // });
  }

  render() {
    return (
      <div>
        {/* <ManageTasksNew /> */}
        <div className={styles.TableTitle}>
          <h2>Current Tasks</h2>
        </div>
        {/* <ManageTasksList tasks={this.state.currentTasks} /> */}
        <div className={styles.TableTitle}>
          <h2>Past Tasks</h2>
        </div>
        {/* <ManageTasksList tasks={this.state.pastTasks} /> */}
      </div>
    );
  }
}

export default ManageTasks;