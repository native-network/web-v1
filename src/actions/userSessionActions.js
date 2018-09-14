import { push } from 'connected-react-router';
import { userSessionActions as actions } from './actionTypes';
import { communityContractInstance } from '../utils/constants';
import { beginAjaxCall } from './loadingActions';
import { get, post } from '../requests';
import { promptSign } from '../web3/Web3Service';
import { toastrError, toastrSuccess } from './toastrActions';

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

export const stake = (community) => {
  return async (dispatch) => {
    dispatch({ type: actions.STAKE });
    const { community3 } = await communityContractInstance(community);
    try {
      await community3.approve(
        community.address,
        community.currency.minimumStake,
      );
      await community3.stake();
      dispatch({ type: actions.STAKE_SUCCESS });
      return dispatch(
        toastrSuccess(`You have successfully staked into ${community.name}!`),
      );
    } catch (err) {
      const { message } = err;
      dispatch(toastrError(message));
      return dispatch({ type: actions.STAKE_ERROR });
    }
  };
};
