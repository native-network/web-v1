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
    case actions.ADD_NEW_COMMUNITY_SUCCESS:
      return {
        ...state,
        communities: [...state.communities, action.community],
      };
    default:
      return state;
  }
}
