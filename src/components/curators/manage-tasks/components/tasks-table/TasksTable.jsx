import React from 'react';
import ReactTable from 'react-table';

import { tasksTableColumnConfig } from './utils/tasksTableColumnConfig';

import styles from './TasksTable.css';

function ManageTasksList(props) {
  const { tasks } = props;
  return (
    <div className={styles.TableContainer}>
      <ReactTable
        columns={tasksTableColumnConfig}
        noDataText="No tasks were found"
        data={(tasks || []).map(
          ({ title, timeToComplete, startDate, endDate, reward, status }) => ({
            title,
            timeToComplete: `${timeToComplete} ${
              timeToComplete === 1 ? 'day' : 'days'
            }`,
            startDate,
            endDate,
            reward: `${reward} NTV`,
            status,
          }),
        )}
      />
    </div>
  );
}

export default ManageTasksList;
