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

export const getCommunityDevFund = (community) => {
  return async (dispatch) => {
    dispatch({ type: 'GET_DEV_FUND' });

    return communityContractInstance(community)
      .then(({ community3 }) => {
        community3
          .communityAvailableDevFund()
          .then((data) =>
            dispatch(
              updateCommunityDevFund({ id: community.id, devFund: data }),
            ),
          )
          .catch(({ message }) => updateCommunityDevFundIssue(message));
      })
      .catch(({ message }) => updateCommunityDevFundIssue(message));
  };
};

export const updateCommunityDevFund = ({ id, devFund }) => {
  return {
    type: actions.UPDATE_COMMUNITY_DEV_FUND,
    data: { id, devFund },
  };
};

export const updateCommunityDevFundIssue = (error) => {
  return {
    type: actions.UPDATE_COMMUNITY_DEV_FUND_ISSUE,
    error,
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
      switch (status) {
        case 'blacklisted':
          dispatch(
            toastrSuccess('User has been blacklisted from the community.'),
          );
          break;
        case 'member':
          dispatch(
            toastrSuccess(
              'This user has been removed from the blacklist and is now able to engage in community actions.',
            ),
          );
          break;
        case 'denied':
          dispatch(
            toastrSuccess('This user has been denied access to the community'),
          );
          break;
        case 'approved':
          dispatch(toastrSuccess('This user has been approved'));
          break;
        default:
          break;
      }
      dispatch(updateUserStatusComplete(communityId, userId, status));
    } catch (err) {
      const { message } = err;
      dispatch(
        toastrError(
          'There was a problem updating this member. Please try again.',
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
        toastrSuccess('Successfully Requested approval to join community'),
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

export const preApproveUser = ({ communityId, address }) => {
  return async (dispatch) => {
    dispatch({ type: actions.PRE_APPROVE_USER });
    try {
      const { data } = await post(`communities/${communityId}/preapproveUser`, {
        communityId,
        address,
      });
      dispatch(
        toastrSuccess(
          `User with an Ethereum address of ${address}, has been pre approved`,
        ),
      );
      return dispatch(preApprovedUserComplete({ data, communityId }));
    } catch (err) {
      const { message } = err;
      dispatch(toastrError('Something went wrong'));
      dispatch(preApprovedUserIssue(message));
    }
  };
};

export const preApprovedUserComplete = ({ data, communityId }) => {
  return {
    type: actions.PRE_APPROVE_USER_COMPLETE,
    data,
    communityId,
  };
};

export const preApprovedUserIssue = (error) => {
  return {
    type: actions.PRE_APPROVE_USER_ISSUE,
    error,
  };
};
