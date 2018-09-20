import { push } from 'connected-react-router';
import { userSessionActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get, post } from '../requests';
import { promptSign, getAddress } from '../web3/Web3Service';
import { getUserWalletAddress } from './userWalletActions';
import { toastrError, toastrInfo } from './toastrActions';

export const getUserSession = () => {
  return async (dispatch, getState) => {
    const { state } = getState().router.location;
    const { address: walletAddress } = getState().user.wallet;
    dispatch({ type: actions.GET_USER_SESSION });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get(`user`);
      const { user } = data;
      if (user) {
        if (user.address !== walletAddress) {
          dispatch(endSession());
        }
        dispatch(getUserSessionSuccess(user));
        if (state && state.from) {
          return dispatch(push(state.from.pathname));
        }
      } else {
        return dispatch(getUserSessionError('No user in session.'));
      }
    } catch (err) {
      const { message } = err;
      dispatch(toastrError(message));
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
      dispatch(toastrError(message));
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
      dispatch(toastrError(message));
      return dispatch(getUserSessionError(message));
    }
  };
};

export const getUserSessionSuccess = (user) => {
  return {
    type: actions.GET_USER_SESSION_SUCCESS,
    user,
  };
};

export const getUserSessionError = (error) => {
  return {
    type: actions.GET_USER_SESSION_ERROR,
    error,
  };
};

export const endSession = () => {
  return async (dispatch) => {
    dispatch({ type: actions.END_SESSION });
    dispatch(beginAjaxCall());
    try {
      const { data } = await post(`user/end-session`, {});
      if (data === 'Session cleared.') {
        dispatch(push('/'));
        dispatch(toastrInfo('Session Cleared. Please authenticate again.'));
        return dispatch({ type: actions.END_SESSION_SUCCESS });
      } else {
        const error = 'There was a problem ending the session.';
        dispatch(toastrError(error));
        return dispatch({ type: 'END_SESSION_ERROR', error });
      }
    } catch (error) {
      const { message } = error;
      dispatch(toastrError(message));
      return dispatch({ type: 'END_SESSION_ERROR', error: message });
    }
  };
};

export const refreshAccounts = (user) => {
  return async (dispatch) => {
    const { address: sessionAddress, wallet, sessionError } = user;
    const { address } = wallet;
    try {
      const web3Address = await getAddress();
      if (web3Address) {
        if ((web3Address && !address) || web3Address !== address) {
          return dispatch(getUserWalletAddress());
        }
        if (sessionAddress !== web3Address && !sessionError) {
          return dispatch(endSession());
        }
      }
    } catch (err) {
      if (sessionAddress) return dispatch(endSession());
    }
  };
};
