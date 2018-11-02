import React from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';
import moment from 'moment';
import VoteResults from '../../shared/vote-results';

import styles from './ManagePolls.css';

Object.assign(ReactTableDefaults, {
  minRows: 0,
  showPaginationBottom: false,
});

const cols = [
  {
    Header: 'Title',
    accessor: 'title',
    maxWidth: 160,
  },
  {
    Header: 'Poll Question',
    accessor: 'question',
    style: {
      whiteSpace: 'normal',
    },
  },
  {
    Header: 'Start Date',
    accessor: 'startDate',
    maxWidth: 150,
    Cell: ({ value }) => moment(value).fromNow(),
  },
  {
    Header: 'End Date',
    accessor: 'endDate',
    maxWidth: 150,
    Cell: ({ value }) => moment(value).fromNow(),
  },
  {
    Header: 'Results',
    accessor: 'results',
    Cell: ({ value }) => (
      <VoteResults votes={value.votes} options={value.options} />
    ),
  },
  {
    Header: 'Status',
    accessor: 'status',
    Cell: ({ value }) => (value ? 'Open' : 'Closed'),
    maxWidth: 130,
    filterable: true,
    filterMethod: (filter, row) => {
      if (filter.value === 'all') return row;
      if (filter.value === 'true') return row.status;
      if (filter.value === 'false') return !row.status;
    },
    Filter: ({ filter, onChange }) => (
      <select
        onChange={(event) => onChange(event.target.value)}
        value={filter ? filter.value : 'all'}
      >
        <option value="all">Show All</option>
        <option value="true">Open</option>
        <option value="false">Closed</option>
      </select>
    ),
  },
];

function ManagePollsList({ polls }) {
  return (
    <div className={styles.TableContainer}>
      <ReactTable
        columns={cols}
        data={polls.map(
          ({ title, question, options, votes, startDate, endDate }) => {
            return {
              title,
              question,
              results: { options, votes },
              startDate,
              endDate,
              status: moment(endDate).isAfter(moment()),
            };
          },
        )}
      />
    </div>
  );
}

export default ManagePollsList;
