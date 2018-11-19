import moment from 'moment';

export const tasksTableColumnConfig = [
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
    Cell: ({ value }) => moment(value).format('MM/DD/YYYY'),
  },
  {
    Header: 'End Date',
    accessor: 'endDate',
    Cell: ({ value }) => moment(value).format('MM/DD/YYYY'),
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
