/* eslint-disable */
import { userActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get, post } from '../requests';
import { getAddress, promptSign } from '../web3';

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
      if (data.length > 0) {
        return dispatch(getUserSessionSuccess(data));
      } else {
        return dispatch(promptAuthorize());
      }
    } catch (err) {
      const { message } = err;
      return dispatch(getUserError(message));
    }
  };
};

export const promptAuthorize = () => {
  return async (dispatch) => {
    dispatch({ type: actions.PROMPT_AUTHORIZE });
    try {
      const { data } = await get(`user/nonce`);
      if (data) {
        return dispatch(promptSignature(data));
      }
      return dispatch(getUserError('No nonce found.'));
    } catch (err) {
      const { message } = err;
      return dispatch(getUserError(message));
    }
  };
};

export const promptSignature = (nonce) => {
  return async (dispatch) => {
    dispatch({ type: actions.PROMPT_SIGNATURE });
    try {
      const signature = await promptSign(nonce);
      const { data } = await post(`user/authorize`, { signature });
      return dispatch(getUserSignatureSuccess(data));
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

export const getUserSignatureSuccess = (signature) => {
  console.log(signature);
  return {
    type: actions.GET_USER_SIGNATURE_SUCCESS,
    signature,
  };
};

export const getUserError = (error) => {
  return {
    type: actions.GET_USER_ERROR,
    error,
  };
};
