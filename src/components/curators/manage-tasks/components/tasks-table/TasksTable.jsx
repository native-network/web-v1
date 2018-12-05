import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  approveTask,
  cancelTask,
} from '../../../../../actions/communityTasksActions';

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
            id,
            contractId,
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
            actions: {
              approve: () => props.approveTask(id),
              cancel: () => props.cancelTask(contractId),
              deny: () => alert('deny'),
            },
          }),
        )}
      />
    </div>
  );
}

export const mapDispatchToProps = (dispatch) => {
  return {
    approveTask: bindActionCreators(approveTask, dispatch),
    cancelTask: bindActionCreators(cancelTask, dispatch),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(ManageTasksList);
