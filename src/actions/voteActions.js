import { voteActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { getCommunityPolls } from './communityPollsActions';
import { post } from '../requests';

export const submitVote = (pollId, optionId, communityId) => {
  return async (dispatch) => {
    dispatch({ type: actions.VOTE });
    dispatch(beginAjaxCall());

    try {
      const { data } = await post(`polls/${pollId}/vote`, { optionId });
      dispatch(getCommunityPolls(communityId));
      return dispatch(voteSuccess(data));
    } catch (err) {
      const { message } = err;
      return dispatch(voteError(message));
    }
  };
};

export const voteSuccess = (vote) => {
  return {
    type: actions.VOTE_SUCCESS,
    vote,
  };
};

export const voteError = (error) => {
  return {
    type: actions.VOTE_ERROR,
    error,
  };
};
