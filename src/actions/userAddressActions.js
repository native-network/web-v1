import { userAddressActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { getAddress } from '../web3/Web3Service';

export const getUserAddress = () => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_USER_ADDRESS });
    dispatch(beginAjaxCall());
    try {
      const data = await getAddress();
      return dispatch(getUserAddressSuccess(data));
    } catch (err) {
      const { message } = err;
      return dispatch(getUserAddressError(message));
    }
  };
};

export const getUserAddressSuccess = (address) => {
  return {
    type: actions.GET_USER_ADDRESS_SUCCESS,
    address,
  };
};

export const getUserAddressError = (error) => {
  return {
    type: actions.GET_USER_ADDRESS_ERROR,
    error,
  };
};
