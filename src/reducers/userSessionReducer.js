import { userSessionActions as actions } from '../actions/actionTypes';
import { initialState } from './initialState';

export default function userSessionReducer(state = {}, action) {
  switch (action.type) {
    case actions.PROMPT_AUTHORIZE:
      return { ...state, loading: true };
    case actions.AUTHORIZATION_COMPLETE:
      return { ...state, loading: false, ...action.user, sessionErrror: '' };
    case actions.GET_USER_SESSION_SUCCESS:
      return { ...state, ...action.user, sessionErrror: '' };
    case actions.GET_USER_SESSION_ERROR:
      return { ...state, address: '', sessionError: action.error };
    case actions.END_SESSION_SUCCESS:
      return { ...initialState.user, address: '', sessionError: '' };
    case actions.POLL_USER_COMPLETE:
      return { ...state, ...action.user };
    case actions.NETWORK_CHANGE:
      return { ...state, doesNetworkMatch: action.doesNetworkMatch };
    case actions.END_SESSION_ERROR:
      return { ...initialState.user, address: '', sessionError: action.error };
    case actions.UPDATE_USER_SUCCESS:
      return { ...state, ...action.user };
    case actions.UPDATE_USER_ERROR:
      return { ...state, userError: action.error };
    case actions.UPDATE_KYC_COMPLETE:
      return { ...state, kycApplicantId: action.user.kycApplicantId };
    case actions.UPDATE_KYC_ISSUE:
      return { ...state, userError: action.sessionError };
    case actions.POLL_KYC_STATUS_COMPLETE:
      return { ...state, kycStatus: action.kycStatus };
    case actions.POLL_KYC_STATUS_ISSUE:
      return { ...state, userError: action.error };
    case actions.GET_KYC_TOKEN_COMPLETE:
      return { ...state, kycToken: action.token };
    case actions.GET_KYC_TOKEN_ISSUE:
      return { ...state, userError: action.error };
    case actions.DISMISS_USER_MESSAGE: {
      const filteredMessages = state.messages.filter((message) => {
        return message.id !== action.messageId;
      });
      return { ...state, messages: filteredMessages };
    }
    default:
      return state;
  }
}
