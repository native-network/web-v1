/* eslint-disable */
import React from 'react';
import moment from 'moment';

import Button from '../../../../../shared/button';

import styles from '../TasksTable.css';
import { capitalizeFirstLetter } from '../../../../../../utils/helpers';

const handleString = (str) =>
  str
    .split(/(?=[A-Z])/g)
    .map((s) => capitalizeFirstLetter(s))
    .join(' ');

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
    Cell: ({ value }) => handleString(value),
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    resizeable: false,
    width: 250,
    Cell: ({ value, row }) => {
      const { status } = row;
      const { approve, cancel, deny, decline } = value;
      switch (status) {
        case 'claimed':
          return (
            <Button
              block
              theme="primary"
              content="Decline"
              clickHandler={decline}
            />
          );
        case 'escrowed':
          return (
            <Button
              block
              theme="primary"
              content="Cancel"
              clickHandler={cancel}
            />
          );
        case 'pendingApproval':
          return (
            <div className={styles.ButtonGroup}>
              <Button
                theme="primary"
                content="Approve"
                clickHandler={approve}
              />
              <Button
                outline
                theme="primary"
                content="Deny"
                clickHandler={deny}
              />
            </div>
          );
        default:
          return;
      }
    },
  },
];
