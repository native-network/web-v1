import { userActions as actions } from '../actions/actionTypes';

const initialState = {
    address: null,
    tribes: [],
    error: ''
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_USER_ADDRESS_SUCCESS:
      return { ...state, address: action.address, error: '' };
    case actions.GET_USER_ADDRESS_ERROR:
      return { ...initialState, address: null, error: action.error };
    default:
      return state;
  }
}
