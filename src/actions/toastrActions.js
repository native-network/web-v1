import { actions as toastrActions } from 'react-redux-toastr';

export const toastrError = (message) =>
  toastrActions.add({ title: 'Error', type: 'error', message });

export const toastrSuccess = (message) =>
  toastrActions.add({ title: 'Success', type: 'success', message });

export const toastrInfo = (message) =>
  toastrActions.add({ title: 'Notice', type: 'info', message });
