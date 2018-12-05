import React from 'react';
import moment from 'moment';

import Button from '../../../../../shared/button';

import styles from '../TasksTable.css';

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
