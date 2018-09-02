import { allCommunitiesActions as actions } from '../actions/actionTypes';
import { initialState } from './initialState';

export default function allCommunitiesReducer(
  state = initialState.communities,
  action,
) {
  switch (action.type) {
    case actions.GET_COMMUNITIES_SUCCESS:
      return {
        ...state,
        communities: action.communities,
      };
    case actions.GET_COMMUNITIES_ERROR:
      return {
        ...initialState,
        communities: [],
        error: action.error,
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
