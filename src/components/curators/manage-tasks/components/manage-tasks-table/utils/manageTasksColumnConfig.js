export const manageTasksColumnConfig = [
  {
    Header: 'Task Title',
    accessor: 'title',
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
    Header: 'Time to Complete',
    Cell: ({
      row: {
        _original: { timeToComplete, timeToCompleteUnit },
      },
    }) => {
      return timeToComplete + ' ' + timeToCompleteUnit;
    },
  },
  {
    Header: 'Start Date',
    accessor: 'startDate',
    Cell: ({ value }) => {
      return value;
    },
  },
  {
    Header: 'End Date',
    accessor: 'endDate',
    Cell: ({ value }) => {
      return value;
    },
  },
  {
    Header: 'Reward',
    accessor: 'reward',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'Actions',
    accessor: 'actions',
  },
];
