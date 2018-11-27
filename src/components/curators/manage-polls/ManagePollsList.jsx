import React from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';
import moment from 'moment';
import VoteResults from '../../shared/vote-results';
import Filter from '../../../components/shared/filter';

import styles from './ManagePolls.css';

const filters = [
  {
    name: 'All',
    filter: (items) => items,
  },
  {
    name: 'Open',
    filter: (items) =>
      (items || []).filter((i) => !moment(i.endDate).isBefore(moment())),
  },
  {
    name: 'Closed',
    filter: (items) =>
      (items || []).filter((i) => moment(i.endDate).isBefore(moment())),
  },
];

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
    filterable: true,
    filterMethod: ({ value: filter }, row) => filter(row),
    headerStyle: {
      overflow: 'visible',
    },
    Filter: ({ onChange }) => (
      <Filter
        filters={filters}
        activeFilter={filters[0]}
        selectHandler={({ filter }) => onChange(filter)}
      />
    ),
    filterAll: true,
  },
];

function ManagePollsList({ polls }) {
  return (
    <div className={styles.TableContainer}>
      <ReactTable
        columns={cols}
        style={{
          overflow: 'visible',
        }}
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
