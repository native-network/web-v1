import { tribeActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get } from '../requests';

export const getTribes = () => {
  return async dispatch => {
    dispatch({ type: actions.GET_TRIBES });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get('http://localhost:3004/tribes');

      return dispatch(getTribesSuccess(data));
    } catch (err) {

      return dispatch(getTribesError(err));
    }
  };
}

export const getTribesSuccess = (tribes) => {
  return {
    type: actions.GET_TRIBES_SUCCESS,
    tribes
  };
}

export const getTribesError = (error) => {
  return {
    type: actions.GET_TRIBES_ERROR,
    error
  }
}
