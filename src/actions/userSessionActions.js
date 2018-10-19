import { push } from 'connected-react-router';
import { userSessionActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get, post, patch } from '../requests';
import { promptSign, getAddress } from '../web3/Web3Service';
import {
  getUserWalletAddress,
  updateUserWalletEthBalance,
} from './userWalletActions';
import { MESSAGES } from '../utils/constants';
import { toastrError, toastrInfo, toastrSuccess } from './toastrActions';
import { getWeb3ServiceInstance } from '../web3/Web3Service';

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

export const pollUserStake = (stakeConfirmationInterval) => {
  return async (dispatch) => {
    const messageId = MESSAGES.STAKE_CONFIRM;
    stakeConfirmationInterval = setInterval(async () => {
      try {
        const { data } = await get(`user`);
        const { user } = data;
        if (user) {
          dispatch({ type: actions.POLL_USER_COMPLETE, user });
        }
        const stakedConfirmationMessage = user.messages.find((message) => {
          return message.id === messageId;
        });
        if (stakedConfirmationMessage) {
          clearInterval(stakeConfirmationInterval);
        }
      } catch (err) {
        const { message } = err;
        console.log(message); // eslint-disable-line
      }
    }, 1000);
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
  return async (dispatch, getState) => {
    const { doesNetworkMatch } = getState().user;
    const { address: sessionAddress, wallet, sessionError } = user;
    const { address } = wallet;
    const { web3 } = getWeb3ServiceInstance();

    try {
      const network = await web3.eth.net.getNetworkType();
      if (network !== process.env.WEB3NETWORK && doesNetworkMatch) {
        return dispatch({
          type: actions.NETWORK_CHANGE,
          doesNetworkMatch: false,
        });
      } else if (network === process.env.WEB3NETWORK && !doesNetworkMatch) {
        dispatch({ type: actions.NETWORK_CHANGE, doesNetworkMatch: true });
      }
    } catch (err) {
      return err;
    }

    try {
      const web3Address = await getAddress();
      if (web3Address) {
        dispatch(updateUserWalletEthBalance(address));
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

export const checkNetwork = () => {
  return async (dispatch) => {
    const { web3 } = getWeb3ServiceInstance();
    const network = await web3.eth.net.getNetworkType();

    return dispatch({
      type: actions.NETWORK_CHANGE,
      doesNetworkMatch: network === process.env.WEB3NETWORK,
    });
  };
};

export const dismissUserMessage = (messageId) => {
  return async (dispatch) => {
    try {
      const { data } = await post(`user/dismiss`, { message: messageId });
      const messageExists = data.messages.find((message) => {
        return message.id === messageId;
      });
      if (!messageExists) {
        dispatch({ type: actions.DISMISS_USER_MESSAGE, messageId: messageId });
      }
    } catch (err) {
      if (err) {
        dispatch(
          toastrError('There was a problem dismissing the notification.'),
        );
      }
    }
  };
};

export const updateUser = (user, values) => {
  return async (dispatch) => {
    dispatch({ type: actions.UPDATE_USER });
    dispatch(beginAjaxCall());
    try {
      const updatedValues = Object.entries(values)
        .filter(
          ([key, val]) => Object.keys(user).includes(key) && user[key] !== val,
        )
        .reduce((acc, [key, val]) => {
          acc[key] = val;
          return acc;
        }, {});

      const { data } = await patch(`user/${user.id}`, {
        id: user.id,
        ...updatedValues,
      });

      dispatch(toastrSuccess('Profile updated successfully!'));
      return dispatch(updateUserSuccess(data));
    } catch (err) {
      const { message } = err;
      dispatch(toastrError('Something went wrong'));
      dispatch(updateUserError(message));
    }
  };
};

export const updateUserSuccess = (user) => {
  return {
    type: actions.UPDATE_USER_SUCCESS,
    user,
  };
};

export const updateUserError = (error) => {
  return {
    type: actions.UPDATE_USER_ERROR,
    error,
  };
};
