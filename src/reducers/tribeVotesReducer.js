import { tribeVotesActions as actions } from '../actions/actionTypes';

const initialState = {
  votes: [],
  error: '',
};

export default function tribeVotesReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_TRIBE_VOTES_SUCCESS:
      return {
        ...state,
        votes: action.votes,
      };
    case actions.GET_TRIBE_VOTES_ERROR:
      return {
        ...initialState,
        votes: [],
        error: action.error,
      };
    default:
      return state;
  }
}
