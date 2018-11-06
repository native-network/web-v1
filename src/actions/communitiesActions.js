import { communitiesActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get, post, put } from '../requests';
import { communityContractInstance } from '../utils/constants';
import { toastrError, toastrSuccess } from './toastrActions';
import { setPriceNTV } from './pricesActions';

export const getCommunities = () => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_COMMUNITIES });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get('communities');

      if (data.length > 0) {
        data.map((community) =>
          dispatch(updateCommunityWithCurrencyData(community)),
        );
      }
      return dispatch(getCommunitiesSuccess(data));
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
            if (symbol === 'NTV') {
              dispatch(setPriceNTV(price));
            }

            dispatch(
              updateCommunityWithCurrencyDataSuccess({
                id: community.id,
                currency: {
                  tokenAddress: community.tokenAddress,
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

export const updateCommunity = (community) => {
  return async (dispatch) => {
    dispatch({ type: actions.UPDATE_COMMUNITY });
    dispatch(beginAjaxCall());

    try {
      const { data } = await put(`communities/${community.id}`, community);

      dispatch(toastrSuccess(`${community.name} has been updated.`));
      return dispatch(updateCommunitySuccess(data));
    } catch ({ message }) {
      dispatch(toastrError(message));
      return dispatch(updateCommunityError({ message, id: community.id }));
    }
  };
};

export const updateCommunitySuccess = (community) => {
  return {
    type: actions.UPDATE_COMMUNITY_SUCCESS,
    community,
  };
};

export const updateCommunityError = (error) => {
  return {
    type: actions.UPDATE_COMMUNITY_ERROR,
    error,
  };
};

export const getCommunityMembers = (communityId) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_COMMUNITY_MEMBERS });
    dispatch(beginAjaxCall());

    try {
      const { data } = await get(`communities/${communityId}/members`);

      return dispatch(getCommunityMembersSuccess(communityId, data));
    } catch (err) {
      const { message } = err;
      dispatch(getCommunitiesError({ id: communityId, message }));
    }
  };
};

export const getCommunityMembersSuccess = (communityId, members) => {
  return {
    type: actions.GET_COMMUNITY_MEMBERS_SUCCESS,
    id: communityId,
    members,
  };
};

export const getCommunityMembersError = (error) => {
  return {
    type: actions.GET_COMMUNITY_MEMBERS_ERROR,
    error,
  };
};

export const updateUserStatus = ({ communityId, userId, status }) => {
  return async (dispatch) => {
    dispatch({ type: actions.UPDATE_USER_STATUS });
    try {
      await post(`communities/${+communityId}/updateUserStatus`, {
        communityId,
        userId,
        status,
      });
      if (status === 'blacklisted') {
        dispatch(
          toastrSuccess('User has been blacklisted from the community.'),
        );
      }
      if (status === 'member') {
        dispatch(toastrSuccess('User has been whitelisted to the community.'));
      }
      dispatch(updateUserStatusComplete(communityId, userId, status));
    } catch (err) {
      const { message } = err;
      dispatch(
        toastrError(
          'There was a problem blacklisting this member. Please try again.',
        ),
      );
      dispatch(updateUserStatusIssue(message));
    }
  };
};

export const updateUserStatusComplete = (communityId, userId, status) => {
  return {
    type: actions.UPDATE_USER_STATUS_COMPLETE,
    communityId,
    userId,
    status,
  };
};

export const updateUserStatusIssue = (error) => {
  return {
    type: actions.UPDATE_USER_STATUS_ISSUE,
    error,
  };
};

export const requestPrivateCommunityAccess = ({
  description,
  email,
  communityId,
  address,
}) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actions.USER_REQUEST_PRIVATE_COMMUNITY_ACCESS });
      await post(`communities/${+communityId}/requestAccess`, {
        description,
        email,
        address,
      });
      dispatch(
        toastrSuccess('Successfully Request approval to join community'),
      );
      dispatch(requestPrivateCommunityAccessComplete());
    } catch (err) {
      const { message } = err;
      dispatch(
        toastrError('There was a problem requesting access to join community'),
      );
      dispatch(requestPrivateCommunityAccessIssue(message));
    }
  };
};

export const requestPrivateCommunityAccessComplete = () => {
  return {
    type: actions.USER_REQUEST_PRIVATE_COMMUNITY_ACCESS_COMPLETE,
  };
};

export const requestPrivateCommunityAccessIssue = (error) => {
  return {
    type: actions.USER_REQUEST_PRIVATE_COMMUNITY_ACCESS_ISSUE,
    error,
  };
};

export const preApprovedUser = ({
  communityId,
  walletAddress,
  emailAddress,
}) => {
  return async (dispatch) => {
    dispatch({ type: actions.PRE_APPROVE_USER });
    try {
      await post(`user/preapproveUser`, {
        communityId,
        walletAddress,
        emailAddress,
      });

      if (emailAddress) {
        dispatch(
          toastrSuccess(
            `User with an email address of ${emailAddress}, has been pre approved`,
          ),
        );
      } else if (walletAddress) {
        dispatch(
          toastrSuccess(
            `User with an Ethereum address of ${emailAddress}, has been pre approved`,
          ),
        );
      }
      return dispatch(
        preApprovedUserComplete({ communityId, walletAddress, emailAddress }),
      );
    } catch (err) {
      const { message } = err;
      dispatch(toastrError('Something went wrong'));
      dispatch(preApprovedUserIssue(message));
    }
  };
};

export const preApprovedUserComplete = (data) => {
  return {
    type: actions.PRE_APPROVE_USER_COMPLETE,
    data,
  };
};

export const preApprovedUserIssue = (error) => {
  return {
    type: actions.PRE_APPROVE_USER_ISSUE,
    error,
  };
};
