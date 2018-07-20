import { userActions as actions } from '../actions/actionTypes';

const initialState = {
    account: null,
    tribes: [],
    error: ''
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_USER_ACCOUNT_SUCCESS:
      return { ...state, account: action.account, error: '' };
    case actions.GET_USER_ACCOUNT_ERROR:
      return { ...initialState, account: null, error: action.error };
    default:
      return state;
  }
}
