import { tribePollsActions as actions } from '../actions/actionTypes';

const initialState = {
  polls: [],
  error: '',
};

export default function tribePollsReducer(state = initialState, action) {
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
