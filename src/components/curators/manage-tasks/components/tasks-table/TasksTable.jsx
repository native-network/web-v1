import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';

import { tasksTableColumnConfig } from './utils/tasksTableColumnConfig';

import styles from './TasksTable.css';

export function ManageTasksList(props) {
  const { tasks } = props;
  return (
    <div className={styles.TableContainer}>
      <ReactTable
        columns={tasksTableColumnConfig}
        noDataText="No tasks were found"
        data={(tasks || []).map(
          ({
            title,
            timeToComplete,
            startDate,
            endDate,
            reward,
            userEmail,
            status,
          }) => ({
            title,
            timeToComplete: `${timeToComplete} ${
              timeToComplete === 1 ? 'day' : 'days'
            }`,
            startDate,
            endDate,
            reward: `${reward} NTV`,
            claimedBy: userEmail,
            status,
          }),
        )}
      />
    </div>
  );
}

export default connect(
  null,
  null,
)(ManageTasksList);
