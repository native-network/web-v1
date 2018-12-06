import React from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  approveTask,
  cancelTask,
  declineClaimedTask,
  denySubmittedTask,
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
              decline: () => props.declineClaimedTask(id),
              cancel: () => props.cancelTask(id),
              deny: () => props.denySubmittedTask(id),
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
    declineClaimedTask: bindActionCreators(declineClaimedTask, dispatch),
    denySubmittedTask: bindActionCreators(denySubmittedTask, dispatch),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(ManageTasksList);
