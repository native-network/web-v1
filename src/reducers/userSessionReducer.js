import { userSessionActions as actions } from '../actions/actionTypes';
import { initialState } from './initialState';

export default function userSessionReducer(state = {}, action) {
  switch (action.type) {
    case actions.GET_USER_SESSION_SUCCESS:
      return { ...state, ...action.user };
    case actions.GET_USER_SESSION_ERROR:
      return { ...state, sessionError: action.error };
    case actions.END_SESSION_SUCCESS:
      return { ...initialState.user, sessionError: action.error };
    case actions.END_SESSION_ERROR:
      return { ...initialState.user, sessionError: action.error };
    default:
      return state;
  }
}
