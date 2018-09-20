import { userSessionActions as actions } from '../actions/actionTypes';
import { initialState } from './initialState';

export default function userSessionReducer(state = {}, action) {
  switch (action.type) {
    case actions.GET_USER_SESSION_SUCCESS:
      return { ...state, ...action.user, sessionErrror: '' };
    case actions.GET_USER_SESSION_ERROR:
      return { ...state, address: '', sessionError: action.error };
    case actions.END_SESSION_SUCCESS:
      return { ...initialState.user, address: '', sessionError: '' };
    case actions.END_SESSION_ERROR:
      return { ...initialState.user, address: '', sessionError: action.error };
    default:
      return state;
  }
}
