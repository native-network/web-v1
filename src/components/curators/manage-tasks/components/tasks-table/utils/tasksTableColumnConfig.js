import React from 'react';
import moment from 'moment';

import Filter from '../../../../../shared/filter';
import Button from '../../../../../shared/button';
import { capitalizeFirstLetter } from '../../../../../../utils/helpers';

import styles from '../TasksTable.css';

const applyFilter = (arr, filterStatus) =>
  (arr || []).filter((i) => i.status === filterStatus);

const statuses = ['initialized', 'escrowed', 'claimed'];

const filters = [
  {
    name: 'All',
    filter: (items) => items,
  },
  ...statuses.map((status) => ({
    name: capitalizeFirstLetter(status),
    filter: (items) => applyFilter(items, status),
  })),
];

export const tasksTableColumnConfig = [
  {
    Header: 'Task Title',
    accessor: 'title',
  },
  {
    Header: 'Time to Complete',
    accessor: 'timeToComplete',
    Cell: ({ value }) => value,
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
    Header: 'Claimed By',
    accessor: 'claimedBy',
    Cell: ({ value }) =>
      value ? (
        <a rel="noopener noreferrer" target="_blank" href={`mailto:${value}`}>
          {value}
        </a>
      ) : null,
  },
  {
    Header: 'Status',
    accessor: 'status',
    filterable: true,
    filterAll: true,
    headerStyle: {
      overflow: 'visible',
    },
    filterMethod: ({ value: filter }, rows) => filter(rows),
    Cell: ({ value }) => capitalizeFirstLetter(value),
    Filter: ({ onChange }) => (
      <Filter
        filters={filters}
        activeFilter={filters[0]}
        selectHandler={({ filter }) => onChange(filter)}
      />
    ),
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    resizeable: false,
    width: 250,
    Cell: ({ row }) => {
      const { status } = row;
      switch (status) {
        case 'escrowed':
          return <Button block theme="primary" content="Cancel" />;
        case 'claimed':
          return (
            <div className={styles.ButtonGroup}>
              <Button theme="primary" content="Approve" />
              <Button outline theme="primary" content="Deny" />
            </div>
          );
        default:
          return;
      }
    },
  },
];
