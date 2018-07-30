import { userAddressActions as actions } from '../actions/actionTypes';

const initialState = {
  address: '',
  tribes: [],
  addressError: '',
};

export default function userAddressReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_USER_ADDRESS_SUCCESS:
      return { ...state, address: action.address, addressError: '' };
    case actions.GET_USER_ADDRESS_ERROR:
      return { ...state, address: '', addressError: action.error };
    default:
      return state;
  }
}
