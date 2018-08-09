import { tribePollsActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get } from '../requests';

export const getTribePolls = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_TRIBE_POLLS });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get(`tribes/${id}/polls`);

      return dispatch(getTribePollsSuccess(data));
    } catch (err) {
      return dispatch(getTribePollsError(err));
    }
  };
};

export const getTribePollsSuccess = (polls) => {
  return {
    type: actions.GET_TRIBE_POLLS_SUCCESS,
    polls,
  };
};

export const getTribePollsError = (error) => {
  return {
    type: actions.GET_TRIBE_POLLS_ERROR,
    error,
  };
};
