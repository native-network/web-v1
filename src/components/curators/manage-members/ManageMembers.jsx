import React from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';
import moment from 'moment';
import WalletAddress from '../../shared/wallet-address';
import { capitalizeFirstLetter } from '../../../utils/helpers';

import styles from './ManageMembers.css';

Object.assign(ReactTableDefaults, {
  minRows: 0,
  showPaginationBottom: false,
});

const cols = [
  {
    Header: 'Alias',
    accessor: 'alias',
  },
  {
    Header: 'Address',
    accessor: 'address',
    Cell: ({ value }) => <WalletAddress address={value} />,
  },
  {
    Header: 'Email',
    accessor: 'email',
    Cell: ({ value }) => (value ? <a href={`mailto:${value}`}>{value}</a> : ''),
  },
  {
    Header: 'Role',
    accessor: 'role',
  },
  {
    Header: 'Member Since',
    accessor: 'memberSince',
  },
];

function ManageMembers({ members }) {
  return (
    <div className={styles.ManageMembers}>
      <ReactTable
        columns={cols}
        data={(members || []).map(
          ({ alias, email, address, role, createdAt }) => ({
            alias,
            email,
            address,
            memberSince: moment(createdAt).format('M/DD/YY'),
            role: capitalizeFirstLetter(role),
          }),
        )}
      />
    </div>
  );
}

export default ManageMembers;
