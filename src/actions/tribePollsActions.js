import { tribePollsActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get, post } from '../requests';

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

export const addNewPoll = (poll) => {
  return async (dispatch) => {
    dispatch({ type: actions.ADD_NEW_POLL });
    dispatch(beginAjaxCall());

    try {
      const { data } = await post('polls', poll);

      return dispatch(addNewPollSuccess(data));
    } catch (err) {
      return dispatch(addNewPollError(err));
    }
  };
};

export const addNewPollSuccess = (poll) => {
  return {
    type: actions.ADD_NEW_POLL_SUCCESS,
    poll,
  };
};

export const addNewPollError = (error) => {
  return {
    type: actions.ADD_NEW_POLL_ERROR,
    error,
  };
};
