import { userSessionActions as actions } from '../actions/actionTypes';

export default function userSessionReducer(state = {}, action) {
  switch (action.type) {
    case actions.GET_USER_SESSION_SUCCESS:
      return { ...state, ...action.session, communities: [] };
    case actions.GET_USER_SESSION_ERROR:
      return { ...state, sessionError: action.error };
    default:
      return state;
  }
}
