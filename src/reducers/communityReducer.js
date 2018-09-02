import { communityActions as actions } from '../actions/actionTypes';
import { initialState } from './initialState';

export default function communityReducer(
  state = initialState.activeCommunity,
  action,
) {
  switch (action.type) {
    case actions.GET_COMMUNITY_BY_ID_SUCCESS:
      return { ...state, community: action.community, error: '' };
    case actions.GET_COMMUNITY_BY_ID_ERROR:
      return { ...state, community: {}, error: action.error };
    case actions.CLEAR_ACTIVE_COMMUNITY:
      return initialState;
    default:
      return state;
  }
}
