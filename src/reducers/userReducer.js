import { userActions as actions } from '../actions/actionTypes';

const initialState = {
    address: '',
    tribes: [],
    error: ''
};

export default function userReducer(state = initialState, action) {

  switch (action.type) {
    case actions.GET_USER_ADDRESS_SUCCESS:
      return { ...state, address: action.address, error: '' };
    case actions.GET_USER_ADDRESS_ERROR:
      return { ...initialState, error: action.error };
    default:
      return state;
  }
}
