import React from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';

import { tasksTableColumnConfig } from './utils/tasksTableColumnConfig';

Object.assign(ReactTableDefaults, {
  minRows: 0,
  showPaginationBottom: false,
});

function ManageTasksList(props) {
  const { tasks } = props;
  return (
    <ReactTable
      columns={tasksTableColumnConfig}
      noDataText="No tasks were found"
      data={(tasks || []).map(
        ({
          title,
          timeToComplete,
          timeToCompleteUnit,
          startDate,
          endDate,
          reward,
          status,
        }) => ({
          title,
          timeToComplete: `${timeToComplete} ${timeToCompleteUnit}`,
          startDate,
          endDate,
          reward: `${reward} NVT`,
          status,
        }),
      )}
    />
  );
}

export default ManageTasksList;
