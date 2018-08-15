import { push } from 'connected-react-router';
import { userSessionActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get, post } from '../requests';
import { promptSign } from '../Web3Service';

export const getUserSession = () => {
  return async (dispatch, getState) => {
    const { state } = getState().router.location;
    dispatch({ type: actions.GET_USER_SESSION });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get(`user`);
      if (data.user) {
        dispatch(getUserSessionSuccess(data.user));
        if (state && state.from) {
          return dispatch(push(state.from.pathname));
        }
      } else {
        return dispatch(getUserSessionError('No user in session.'));
      }
    } catch (err) {
      const { message } = err;
      return dispatch(getUserSessionError(message));
    }
  };
};

export const promptAuthorize = (address) => {
  return async (dispatch) => {
    dispatch({ type: actions.PROMPT_AUTHORIZE });
    dispatch(beginAjaxCall());
    try {
      const { data } = await post(`user/signing`, { address });
      if (data) {
        return dispatch(promptSignature(data, address));
      }
      return dispatch(getUserSessionError('No message to sign found.'));
    } catch (err) {
      const { message } = err;
      return dispatch(getUserSessionError(message));
    }
  };
};

export const promptSignature = (signing, address) => {
  return async (dispatch) => {
    dispatch({ type: actions.PROMPT_SIGNATURE });
    try {
      const signature = await promptSign(signing);
      const { data } = await post(`user/authorize`, { signature, address });
      return dispatch(getUserSessionSuccess(data));
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

export const getUserSessionError = (error) => {
  return {
    type: actions.GET_USER_SESSION_ERROR,
    error,
  };
};
