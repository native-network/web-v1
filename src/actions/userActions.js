import { userActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get } from '../requests';
import { getAddress } from '../web3';

export const getUserAddress = () => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_USER_ADDRESS });
    dispatch(beginAjaxCall());
    try {
      const data = await getAddress();
      return dispatch(getUserAddressSuccess(data));
    } catch (err) {
      const { message } = err;
      return dispatch(getUserError(message));
    }
  };
};

export const getUserSession = () => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_USER_SESSION });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get(`user`);
      return dispatch(getUserSessionSuccess(data));
    } catch (err) {
      const { message } = err;
      return dispatch(getUserError(message));
    }
  };
};

export const getUserAddressSuccess = (address) => {
  return {
    type: actions.GET_USER_ADDRESS_SUCCESS,
    address,
  };
};

export const getUserSessionSuccess = (session) => {
  return {
    type: actions.GET_USER_SESSION_SUCCESS,
    session,
  };
};

export const getUserError = (error) => {
  return {
    type: actions.GET_USER_ERROR,
    error,
  };
};
