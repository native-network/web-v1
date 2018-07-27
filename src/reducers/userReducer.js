import { userActions as actions } from '../actions/actionTypes';

const initialState = {
  address: '',
  session: '',
  tribes: [],
  error: '',
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_USER_ADDRESS_SUCCESS:
      return { ...state, address: action.address, error: '' };
    case actions.GET_USER_SESSION_SUCCESS:
      return { ...state, session: action.session, error: '' };
    case actions.GET_USER_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
