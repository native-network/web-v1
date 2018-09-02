import { communityActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get } from '../requests';

export const getCommunityById = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_COMMUNITY_BY_ID });
    dispatch(beginAjaxCall());

    try {
      const { data } = await get(`communities/${id}`);

      return dispatch(getCommunityByIdSuccess(data));
    } catch (err) {
      return dispatch(getCommunityByIdError(err));
    }
  };
};

export const clearActiveCommunity = () => {
  return {
    type: actions.CLEAR_ACTIVE_COMMUNITY,
  };
};

export const getCommunityByIdSuccess = (community) => {
  return {
    type: actions.GET_COMMUNITY_BY_ID_SUCCESS,
    community,
  };
};

export const getCommunityByIdError = (error) => {
  return {
    type: actions.GET_COMMUNITY_BY_ID_ERROR,
    error,
  };
};
