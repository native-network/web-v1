import { tribePollsActions as actions } from '../actions/actionTypes';
import { initialState } from './initialState';

export default function tribePollsReducer(state = initialState.polls, action) {
  switch (action.type) {
    case actions.GET_TRIBE_POLLS_SUCCESS:
      return {
        ...state,
        polls: action.polls,
      };
    case actions.GET_TRIBE_POLLS_ERROR:
      return {
        ...state,
        error: action.error,
      };
    case actions.ADD_NEW_POLL_SUCCESS:
      return {
        ...state,
        polls: [...state.polls, action.poll],
      };
    case actions.ADD_NEW_POLL_ERROR:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
}
