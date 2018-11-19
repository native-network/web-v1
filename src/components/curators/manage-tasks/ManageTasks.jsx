import React, { Component } from 'react';
// import moment from 'moment';

import ManageTasksTable from './components/manage-tasks-table';
import ManageTasksNew from './components/manage-tasks-new';

import styles from './ManageTasks.css';
// import PropTypes from 'prop-types';

export class ManageTasks extends Component {
  render() {
    return (
      <div>
        <ManageTasksNew communityId={this.props.communityId} />
        <div className={styles.TableTitle}>
          <h2>Current Tasks</h2>
        </div>
        <ManageTasksTable {...this.props} />
      </div>
    );
  }
}

export default ManageTasks;
