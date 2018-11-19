import React from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';

import { manageTasksColumnConfig } from './utils/manageTasksColumnConfig';

Object.assign(ReactTableDefaults, {
  minRows: 0,
  showPaginationBottom: false,
});

function ManageTasksList(props) {
  const { tasks } = props;
  /* eslint-disable */
  console.log('tasks', tasks)
  return (
    <ReactTable
      columns={manageTasksColumnConfig}
      noDataText="No tasks were found"
      data={tasks}
    />
  );
}

export default ManageTasksList;
