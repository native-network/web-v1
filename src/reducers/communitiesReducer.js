import { communitiesActions as actions } from '../actions/actionTypes';
import { initialState } from './initialState';

export default function communitiesReducer(
  state = initialState.communities,
  action,
) {
  switch (action.type) {
    case actions.GET_COMMUNITIES_SUCCESS:
      return {
        ...state,
        communities: [
          ...action.communities.map((community) => ({
            ...community,
            active: false,
          })),
        ],
      };
    case actions.GET_COMMUNITIES_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case actions.SET_ACTIVE_COMMUNITY_SUCCESS:
      return {
        ...state,
        communities: [
          ...state.communities.map(
            (community) =>
              community.id === action.community.id
                ? { ...community, ...action.community, active: true }
                : community,
          ),
        ],
      };
    case actions.UNSET_ACTIVE_COMMUNITY:
      return {
        ...state,
        communities: [
          ...state.communities.map((community) => ({
            ...community,
            active: false,
          })),
        ],
      };
    case actions.UPDATE_COMMUNITY_WITH_CURRENCY_DATA_SUCCESS:
      return {
        ...state,
        communities: [
          ...state.communities.map(
            (community) =>
              community.id === action.community.id
                ? { ...community, currency: action.community.currency }
                : community,
          ),
        ],
      };
    case actions.UPDATE_COMMUNITY_WITH_CURRENCY_DATA_ERROR:
      return {
        ...state,
        communities: [
          ...state.communities.map(
            (community) =>
              community.id === action.error.communityId
                ? {
                    ...community,
                    currency: undefined,
                    error: action.error.message,
                  }
                : community,
          ),
        ],
      };
    case actions.ADD_NEW_COMMUNITY_SUCCESS:
      return {
        ...state,
        communities: [...state.communities, action.community],
      };

    case actions.UPDATE_COMMUNITY_SUCCESS:
      return {
        ...state,
        communities: state.communities.map(
          (c) => (c.id === action.community.id ? action.community : c),
        ),
      };

    case actions.UPDATE_COMMUNITY_ERROR:
      return {
        ...state,
        communities: state.communities.map(
          (c) =>
            c.id === action.error.id
              ? { ...c, error: action.error.message }
              : c,
        ),
      };
    default:
      return state;
  }
}
