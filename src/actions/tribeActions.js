import { tribeActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get } from '../requests';

export const getTribeById = (id) => {
  return async dispatch => {
    dispatch({ type: actions.GET_TRIBE_BY_ID });
    dispatch(beginAjaxCall());

    try {
      const { data } = await get(`tribes/${id}`);

      return dispatch(getTribeByIdSuccess(data));
    } catch (err) {
      return dispatch(getTribeByIdError(err));
    }
  };
};

export const clearActiveTribe = () => {
  return {
    type: actions.CLEAR_ACTIVE_TRIBE
  };
};

export const getTribeByIdSuccess = (tribe) => {
  return {
    type: actions.GET_TRIBE_BY_ID_SUCCESS,
    tribe
  };
};

export const getTribeByIdError = (error) => {
  return {
    type: actions.GET_TRIBE_BY_ID_ERROR,
    error
  };
};
