import React, { Fragment } from 'react';
import moment from 'moment';

import Filter from '../../../../../shared/filter';
import Button from '../../../../../shared/button';
import { capitalizeFirstLetter } from '../../../../../../utils/helpers';

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
    Cell: ({ row }) => {
      const { status } = row;
      switch (status) {
        case 'claimed':
          return (
            <Fragment>
              <Button block theme="secondary" content="Approve" />
              <br />
              <Button block theme="primary" content="Deny" />
            </Fragment>
          );
        case 'escrowed':
          return <Button theme="primary" content="Cancel" />;
        default:
          return;
      }
    },
  },
];
