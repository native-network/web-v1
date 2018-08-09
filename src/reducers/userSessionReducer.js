import { userSessionActions as actions } from '../actions/actionTypes';

const initialState = {
  session: {
    id: undefined,
  },
  sessionError: '',
};

export default function userSessionReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_USER_SESSION_SUCCESS:
      return { ...state, session: action.session };
    case actions.GET_USER_SESSION_ERROR:
      return { ...state, session: '', error: action.error };
    default:
      return state;
  }
}
