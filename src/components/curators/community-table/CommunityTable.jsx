import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTable, { ReactTableDefaults } from 'react-table';
import Button from '../../shared/button';
import WalletAddress from '../../shared/wallet-address';
import {
  numberWithCommas,
  capitalizeFirstLetter,
} from '../../../utils/helpers';
import countries from '../../../utils/countries.json';
import {
  blacklistMember,
  removeBlacklistMember,
} from '../../../actions/communitiesActions';

import styles from './CommunityTable.css';

Object.assign(ReactTableDefaults, {
  minRows: 0,
  showPaginationBottom: false,
});

export function CommunityTable({
  community,
  blacklistMember,
  removeBlacklistMember,
  user,
}) {
  const { members, blacklisted } = community;

  const blacklistedIds = blacklisted.map((item) => item.id);

  const cols = [
    {
      Header: 'User ID',
      accessor: 'userId',
      show: false,
    },
    {
      Header: 'Address',
      accessor: 'address',
      Cell: ({ value }) => <WalletAddress address={value} />,
    },
    {
      Header: 'Alias',
      accessor: 'alias',
      Cell: ({ value, row }) => {
        const val = value || '';
        return row.userId === user.id ? `${val} (Current User)` : val;
      },
    },
    {
      Header: 'Email',
      accessor: 'email',
      style: {
        textAlign: 'center',
      },
      Cell: ({ value }) =>
        value ? (
          <a target="_blank" rel="noopener nofollow" href={`mailto:${value}`}>
            {value}
          </a>
        ) : (
          ''
        ),
    },
    {
      Header: 'Country',
      accessor: 'country',
      Cell: ({ value }) => {
        const country = value
          ? countries.find((country) => country.alpha2 === value)
          : undefined;
        return country ? country.label : '';
      },
    },
    {
      Header: 'State/Province',
      accessor: 'state',
    },
    {
      Header: 'City',
      accessor: 'city',
    },
    {
      Header: 'Telegram',
      accessor: 'telegram',
    },
    {
      Header: 'Preferred Contact',
      accessor: 'preferredContact',
      Cell: ({ value }) => (value ? capitalizeFirstLetter(value) : ''),
    },
    {
      Header: 'Blacklist',
      accessor: 'isBlacklisted',
      resizable: false,
      width: 165,
      filterMethod: (filter, row) => {
        if (filter.value === 'all') return row;
        if (filter.value === 'false') return !row.isBlacklisted;
        if (filter.value === 'true') return row.isBlacklisted;
      },
      Filter: ({ filter, onChange }) => (
        <select
          value={filter ? filter.value : 'all'}
          onChange={(event) => onChange(event.target.value)}
          style={{ width: '100%' }}
        >
          <option value="all">All</option>
          <option value="false">Unblacklisted</option>
          <option value="true">Blacklisted</option>
        </select>
      ),
      style: {
        textAlign: 'center',
      },
      Cell: ({ value, row }) => {
        const isUser = row.userId === user.id;
        return (
          <input
            type="checkbox"
            disabled={isUser}
            checked={value}
            onChange={() =>
              value
                ? removeBlacklistMember(community.id, row.userId)
                : blacklistMember(community.id, row.userId)
            }
          />
        );
      },
    },
  ];
  return (
    <div className={styles.ManageMembers}>
      <h2 className={styles.ManageMembersTitle}>Members</h2>
      <h3 className={styles.ManageMembersSubtitle}>
        Total Members: {numberWithCommas((members && members.length) || 0)}
      </h3>
      <ReactTable
        columns={cols}
        defaultPageSize={25}
        showPageSizeOptions={false}
        showPageJump={false}
        showPaginationBottom
        data={(members || []).map(
          ({
            id,
            alias,
            email,
            address,
            telegram,
            country,
            state,
            city,
            role,
            preferredContact,
          }) => ({
            userId: id,
            alias,
            email,
            address,
            telegram,
            country,
            state,
            city,
            role,
            preferredContact,
            isBlacklisted: blacklistedIds.includes(id),
          }),
        )}
        filterAll
        filterable
        noDataText="No users found"
        defaultFilterMethod={(filter, row) =>
          row[filter.id]
            ? row[filter.id].toLowerCase().includes(filter.value.toLowerCase())
            : row[filter.id]
        }
        getTrProps={(state, { row }) => {
          const { isBlacklisted, userId } = row;
          const isUser = userId === user.id;

          return {
            style: {
              background:
                isBlacklisted || isUser
                  ? isUser
                    ? 'rgba(0, 150, 0, .15)'
                    : 'rgba(0, 0, 0, .05)'
                  : 'transparent',
              color: isBlacklisted ? 'rgba(140, 140, 140, 1)' : 'initial',
            },
          };
        }}
        PaginationComponent={({ page, pages, onPageChange }) => {
          return pages > 1 ? (
            <div className={styles.Pagination}>
              <Button
                disabled={page === 0}
                theme="secondary"
                content="Previous"
                clickHandler={() => onPageChange(--page)}
              />
              <ul className={styles.PaginationList}>
                {[...Array(pages)].map((p, index) => (
                  <li key={index}>
                    <Button
                      theme={index === page ? 'secondary' : 'white'}
                      content={index + 1}
                      clickHandler={() => onPageChange(index)}
                    />
                  </li>
                ))}
              </ul>
              <Button
                disabled={page + 1 === pages}
                theme="secondary"
                content="Next"
                clickHandler={() => onPageChange(++page)}
              />
            </div>
          ) : null;
        }}
      />
    </div>
  );
}

export const mapDispatchToProps = (dispatch) => {
  return {
    blacklistMember: bindActionCreators(blacklistMember, dispatch),
    removeBlacklistMember: bindActionCreators(removeBlacklistMember, dispatch),
  };
};

export default connect(
  (state) => ({
    user: state.user,
  }),
  mapDispatchToProps,
)(CommunityTable);
