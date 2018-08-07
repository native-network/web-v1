import { tribeVotesActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get } from '../requests';

export const getTribeVotes = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_TRIBE_VOTES });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get(`tribes/${id}/polls`);

      return dispatch(getTribeVotesSuccess(data));
    } catch (err) {
      return dispatch(getTribeVotesError(err));
    }
  };
};

export const getTribeVotesSuccess = (votes) => {
  return {
    type: actions.GET_TRIBE_VOTES_SUCCESS,
    votes,
  };
};

export const getTribeVotesError = (error) => {
  return {
    type: actions.GET_TRIBE_VOTES_ERROR,
    error,
  };
};
