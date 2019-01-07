import moment from 'moment';
import { capitalizeFirstLetter } from './helpers';

const today = moment();

const applyFilter = (arr, filterStatus) =>
  (arr || []).filter((i) => i.status === filterStatus);

export const voteFilters = [
  {
    name: 'All',
    filter: (items) => items,
  },
  {
    name: 'Open',
    filter: (items) =>
      (items || []).filter((item) => moment(item.endDate).isAfter(today)),
  },
  {
    name: 'Closed',
    filter: (items) =>
      (items || []).filter((item) => moment(item.endDate).isBefore(today)),
  },
];

export const taskFilters = [
  {
    name: 'All',
    filter: (items) => items,
  },
  ...['initialized', 'escrowed', 'claimed'].map((status) => ({
    name: capitalizeFirstLetter(status),
    filter: (items) => applyFilter(items, status),
  })),
];

export const projectFilters = voteFilters;
