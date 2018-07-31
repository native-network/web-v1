import { userSessionActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get, post } from '../requests';
import { promptSign } from '../web3';

export const getUserSession = () => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_USER_SESSION });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get(`user`);
      if (data.length > 0) {
        return dispatch(getUserSessionSuccess(data));
      }
    } catch (err) {
      const { message } = err;
      return dispatch(getUserSessionError(message));
    }
  };
};

export const promptAuthorize = () => {
  return async (dispatch) => {
    dispatch({ type: actions.PROMPT_AUTHORIZE });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get(`user/nonce`);
      if (data) {
        return dispatch(promptSignature(data));
      }
      return dispatch(getUserSessionError('No nonce found.'));
    } catch (err) {
      const { message } = err;
      return dispatch(getUserSessionError(message));
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
      return dispatch(getUserSessionError(message));
    }
  };
};

export const getUserSessionSuccess = (session) => {
  return {
    type: actions.GET_USER_SESSION_SUCCESS,
    session,
  };
};

export const getUserSignatureSuccess = (signature) => {
  return {
    type: actions.GET_USER_SIGNATURE_SUCCESS,
    signature,
  };
};

export const getUserSessionError = (error) => {
  return {
    type: actions.GET_USER_SESSION_ERROR,
    error,
  };
};
