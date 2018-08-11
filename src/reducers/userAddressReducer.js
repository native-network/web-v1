import { userAddressActions as actions } from '../actions/actionTypes';

export default function userAddressReducer(state = {}, action) {
  switch (action.type) {
    case actions.GET_USER_ADDRESS_SUCCESS:
      return { ...state, address: action.address, addressError: '' };
    case actions.GET_USER_ADDRESS_ERROR:
      return { ...state, address: '', addressError: action.error };
    default:
      return state;
  }
}
