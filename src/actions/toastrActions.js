import { actions as toastrActions } from 'react-redux-toastr';

export const toastrError = (message) =>
  toastrActions.add({ title: 'Error', type: 'error', message });
