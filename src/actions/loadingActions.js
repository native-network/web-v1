import { loadingActions as loading } from './actionTypes';

export const beginAjaxCall = () => {
  return { type: loading.LOADING };
}
