import { communityPollsActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get, post } from '../requests';

export const getCommunityPolls = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_COMMUNITY_POLLS });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get(`communities/${id}/polls`);

      return dispatch(getCommunityPollsSuccess(data));
    } catch (err) {
      const { message } = err;
      return dispatch(getCommunityPollsError(message));
    }
  };
};

export const getCommunityPollsSuccess = (polls) => {
  return {
    type: actions.GET_COMMUNITY_POLLS_SUCCESS,
    polls,
  };
};

export const getCommunityPollsError = (error) => {
  return {
    type: actions.GET_COMMUNITY_POLLS_ERROR,
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
      const { message } = err;
      return dispatch(addNewPollError(message));
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
