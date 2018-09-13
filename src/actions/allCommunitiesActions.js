import { allCommunitiesActions as communitiesActions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { getCurrencyDataByCommunity } from './currencyActions';
import { get, post } from '../requests';
import { toastrError } from './toastrActions';

export const getCommunities = () => {
  return async (dispatch) => {
    dispatch({ type: communitiesActions.GET_COMMUNITIES });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get('communities');

      dispatch(getCommunitiesSuccess(data));
      if (data.length > 0) {
        return data.map((community) =>
          dispatch(getCurrencyDataByCommunity(community)),
        );
      }
    } catch (err) {
      const { message } = err;
      dispatch(toastrError(message));
      return dispatch(getCommunitiesError(message));
    }
  };
};

export const getCommunitiesSuccess = (communities) => {
  return {
    type: communitiesActions.GET_COMMUNITIES_SUCCESS,
    communities,
  };
};

export const getCommunitiesError = (error) => {
  return {
    type: communitiesActions.GET_COMMUNITIES_ERROR,
    error,
  };
};

export const addNewCommunity = (community) => {
  return async (dispatch) => {
    dispatch({ type: communitiesActions.ADD_NEW_COMMUNITY });
    dispatch(beginAjaxCall());

    try {
      const { data } = await post('communities', community);

      return dispatch(addNewCommunitySuccess(data));
    } catch (err) {
      const { message } = err;
      return dispatch(addNewCommunityError(message));
    }
  };
};

export const addNewCommunitySuccess = (community) => {
  return {
    type: communitiesActions.ADD_NEW_COMMUNITY_SUCCESS,
    community,
  };
};

export const addNewCommunityError = (error) => {
  return {
    type: communitiesActions.ADD_NEW_COMMUNITY_ERROR,
    error,
  };
};
