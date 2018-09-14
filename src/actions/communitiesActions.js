import { communitiesActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get, post } from '../requests';
import { communityContractInstance } from '../utils/constants';
import { toastrError } from './toastrActions';

export const getCommunities = () => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_COMMUNITIES });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get('communities');

      dispatch(getCommunitiesSuccess(data));
      if (data.length > 0) {
        return data.map((community) =>
          dispatch(updateCommunityWithCurrencyData(community)),
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
    type: actions.GET_COMMUNITIES_SUCCESS,
    communities,
  };
};

export const getCommunitiesError = (error) => {
  return {
    type: actions.GET_COMMUNITIES_ERROR,
    error,
  };
};

export const setActiveCommunity = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.SET_ACTIVE_COMMUNITY });
    dispatch(beginAjaxCall());

    try {
      const { data } = await get(`communities/${id}`);

      return dispatch(setActiveCommunitySuccess(data));
    } catch (err) {
      const { message } = err;
      dispatch(toastrError(message));
      return dispatch(setActiveCommunityError(message));
    }
  };
};

export const unsetActiveCommunity = () => ({
  type: actions.UNSET_ACTIVE_COMMUNITY,
});

export const setActiveCommunitySuccess = (community) => ({
  type: actions.SET_ACTIVE_COMMUNITY_SUCCESS,
  community,
});

export const setActiveCommunityError = (error) => ({
  type: actions.SET_ACTIVE_COMMUNITY_ERROR,
  error,
});

export const updateCommunityWithCurrencyData = (community) => {
  return async (dispatch) => {
    dispatch({ type: actions.UPDATE_COMMUNITY_WITH_CURRENCY_DATA });
    dispatch(beginAjaxCall());

    return communityContractInstance(community).then(({ community3 }) => {
      Promise.all([
        community3.getPrice(),
        community3.getSymbol(),
        community3.getTotalSupply(),
        community3.minimumStakingRequirement(),
      ])
        .then((data) => {
          if (data) {
            const [price, symbol, totalSupply, minimumStake] = data;

            dispatch(
              updateCommunityWithCurrencyDataSuccess({
                id: community.id,
                currency: {
                  price,
                  symbol,
                  totalSupply,
                  minimumStake,
                  iconUrl: community.icon,
                },
              }),
            );
          }
        })
        .catch((err) => {
          const { message } = err;
          dispatch(toastrError(message));
          return dispatch(updateCommunityWithCurrencyDataError(message));
        });
    });
  };
};

export const updateCommunityWithCurrencyDataSuccess = (community) => ({
  type: actions.UPDATE_COMMUNITY_WITH_CURRENCY_DATA_SUCCESS,
  community,
});

export const updateCommunityWithCurrencyDataError = (error) => ({
  type: actions.UPDATE_COMMUNITY_WITH_CURRENCY_DATA_ERROR,
  error,
});

export const addNewCommunity = (community) => {
  return async (dispatch) => {
    dispatch({ type: actions.ADD_NEW_COMMUNITY });
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
    type: actions.ADD_NEW_COMMUNITY_SUCCESS,
    community,
  };
};

export const addNewCommunityError = (error) => {
  return {
    type: actions.ADD_NEW_COMMUNITY_ERROR,
    error,
  };
};
