import { userActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { getAccount } from '../web3';

export const getUserAccount = () => {
  return async dispatch => {
    dispatch({ type: actions.GET_USER_ACCOUNT });
    dispatch(beginAjaxCall());
    try {
      const data = await getAccount();
      return dispatch(getUserAccountSuccess(data));
    } catch (err) {
      return dispatch(getUserAccountError(err));
    }
  };
}

export const getUserAccountSuccess = (account) => {
  return {
    type: actions.GET_USER_ACCOUNT_SUCCESS,
    account
  };
}

export const getUserAccountError = (error) => {
  return {
    type: actions.GET_USER_ACCOUNT_ERROR,
    error
  }
}
