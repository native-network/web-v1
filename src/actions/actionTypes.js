export const loadingActions = {
  LOADING: 'LOADING',
};

export const communitiesActions = {
  GET_COMMUNITIES: 'GET_COMMUNITIES',
  GET_COMMUNITIES_SUCCESS: 'GET_COMMUNITIES_SUCCESS',
  GET_COMMUNITIES_ERROR: 'GET_COMMUNITIES_ERROR',
  SET_ACTIVE_COMMUNITY: 'SET_ACTIVE_COMMUNITY',
  SET_ACTIVE_COMMUNITY_SUCCESS: 'SET_ACTIVE_COMMUNITY_SUCCESS',
  SET_ACTIVE_COMMUNITY_ERROR: 'SET_ACTIVE_COMMUNITY_ERROR',
  UNSET_ACTIVE_COMMUNITY: 'UNSET_ACTIVE_COMMUNITY',
  UPDATE_COMMUNITY_WITH_CURRENCY_DATA: 'UPDATE_COMMUNITY_WITH_CURRENCY_DATA',
  UPDATE_COMMUNITY_WITH_CURRENCY_DATA_SUCCESS:
    'UPDATE_COMMUNITY_WITH_CURRENCY_DATA_SUCCESS',
  UPDATE_COMMUNITY_WITH_CURRENCY_DATA_ERROR:
    'UPDATE_COMMUNITY_WITH_CURRENCY_DATA_ERROR',
  ADD_NEW_COMMUNITY: 'ADD_NEW_COMMUNITY',
  ADD_NEW_COMMUNITY_SUCCESS: 'ADD_NEW_COMMUNITY_SUCCESS',
  ADD_NEW_COMMUNITY_ERROR: 'ADD_NEW_COMMUNITY_ERROR',
  UPDATE_COMMUNITY: 'UPDATE_COMMUNITY',
  UPDATE_COMMUNITY_SUCCESS: 'UPDATE_COMMUNITY_SUCCESS',
  UPDATE_COMMUNITY_ERROR: 'UPDATE_COMMUNITY_ERROR',
  GET_COMMUNITY_MEMBERS: 'GET_COMMUNITY_MEMBERS',
  GET_COMMUNITY_MEMBERS_SUCCESS: 'GET_COMMUNITY_MEMBERS_SUCCESS',
  GET_COMMUNITY_MEMBERS_ERROR: 'GET_COMMUNITY_MEMBERS_ERROR',
  UPDATE_USER_STATUS: 'UPDATE_USER_STATUS',
  UPDATE_USER_STATUS_COMPLETE: 'UPDATE_USER_STATUS_COMPLETE',
  UPDATE_USER_STATUS_ISSUE: 'UPDATE_USER_STATUS_ISSUE',
  USER_REQUEST_PRIVATE_COMMUNITY_ACCESS:
    'USER_REQUEST_PRIVATE_COMMUNITY_ACCESS',
  USER_REQUEST_PRIVATE_COMMUNITY_ACCESS_COMPLETE:
    'USER_REQUEST_PRIVATE_COMMUNITY_ACCESS_COMPLETE',
  USER_REQUEST_PRIVATE_COMMUNITY_ACCESS_ISSUE:
    'USER_REQUEST_PRIVATE_COMMUNITY_ACCESS_ISSUE',
  PRE_APPROVE_USER: 'PRE_APPROVE_USER',
  PRE_APPROVE_USER_COMPLETE: 'PRE_APPROVE_USER_COMPLETE',
  PRE_APPROVE_USER_ISSUE: 'PRE_APPROVE_USER_ISSUE',
  UPDATE_COMMUNITY_DEV_FUND: 'UPDATE_COMMUNITY_DEV_FUND',
  UPDATE_COMMUNITY_DEV_FUND_ISSUE: 'UPDATE_COMMUNITY_DEV_FUND_ISSUE',
};

export const communityActions = {
  GET_COMMUNITY_BY_ID: 'GET_COMMUNITY_BY_ID',
  GET_COMMUNITY_BY_ID_SUCCESS: 'GET_COMMUNITY_BY_ID_SUCCESS',
  GET_COMMUNITY_BY_ID_ERROR: 'GET_COMMUNITY_BY_ID_ERROR',
  CLEAR_ACTIVE_COMMUNITY: 'CLEAR_ACTIVE_COMMUNITY',
};

export const currencyActions = {
  GET_CURRENCY_DATA_BY_COMMUNITY: 'GET_CURRENCY_DATA_BY_COMMUNITY',
  GET_CURRENCY_DATA_BY_COMMUNITY_SUCCESS:
    'GET_CURRENCY_DATA_BY_COMMUNITY_SUCCESS',
  GET_CURRENCY_DATA_BY_COMMUNITY_ERROR: 'GET_CURRENCY_DATA_BY_COMMUNITY_ERROR',
  SEND_TRANSACTION_IN_ETH: 'SEND_TRANSACTION_IN_ETH',
  SEND_TRANSACTION_IN_ETH_SUCCESS: 'SEND_TRANSACTION_IN_ETH_SUCCESS',
  SEND_TRANSACTION_IN_ETH_ERROR: 'SEND_TRANSACTION_IN_ETH_ERROR',
  SEND_TRANSACTION_IN_NTV: 'SEND_TRANSACTION_IN_NTV',
  SEND_TRANSACTION_IN_NTV_SUCCESS: 'SEND_TRANSACTION_IN_NTV_SUCCESS',
  SEND_TRANSACTION_IN_NTV_ERROR: 'SEND_TRANSACTION_IN_NTV_ERROR',
  STAKE_TRANSACTION: 'STAKE_TRANSACTION',
  STAKE_TRANSACTION_SUCCESS: 'STAKE_TRANSACTION_SUCCESS',
  STAKE_TRANSACTION_ERROR: 'STAKE_TRANSACTION_ERROR',
};

export const userWalletActions = {
  GET_USER_WALLET_ADDRESS: 'GET_USER_WALLET_ADDRESS',
  GET_USER_WALLET_ADDRESS_SUCCESS: 'GET_USER_WALLET_ADDRESS_SUCCESS',
  GET_USER_WALLET_ADDRESS_ERROR: 'GET_USER_WALLET_ADDRESS_ERROR',
  GET_USER_WALLET_BALANCES: 'GET_USER_WALLET_BALANCES',
  GET_USER_WALLET_BALANCES_SUCCESS: 'GET_USER_WALLET_BALANCES_SUCCESS',
  GET_USER_WALLET_BALANCES_ERROR: 'GET_USER_WALLET_BALANCES_ERROR',
  UPDATE_USER_WALLET_ETH_BALANCE: 'UPDATE_USER_WALLET_ETH_BALANCE',
};

export const userSessionActions = {
  GET_USER_SESSION: 'GET_USER_SESSION',
  GET_USER_SESSION_SUCCESS: 'GET_USER_SESSION_SUCCESS',
  GET_USER_SESSION_ERROR: 'GET_USER_SESSION_ERROR',
  POLL_USER_COMPLETE: 'POLL_USER_COMPLETE',
  PROMPT_AUTHORIZE: 'PROMPT_AUTHORIZE',
  PROMPT_SIGNATURE: 'PROMPT_SIGNATURE',
  AUTHORIZATION_COMPLETE: 'AUTHORIZATION_COMPLETE',
  GET_USER_SIGNATURE_SUCCESS: 'GET_USER_SIGNATURE_SUCCESS',
  END_SESSION: 'END_SESSION',
  END_SESSION_SUCCESS: 'END_SESSION_SUCCESS',
  END_SESSION_ERROR: 'END_SESSION_ERROR',
  DISMISS_USER_MESSAGE: 'DISMISS_USER_MESSAGE',
  NETWORK_CHANGE: 'NETWORK_CHANGE',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
  UPDATE_USER_ERROR: 'UPDATE_USER_ERROR',
  GET_KYC_TOKEN: 'GET_KYC_TOKEN',
  GET_KYC_TOKEN_COMPLETE: 'GET_KYC_TOKEN_COMPLETE',
  GET_KYC_TOKEN_ISSUE: 'GET_KYC_TOKEN_ISSUE',
  UPDATE_KYC: 'UPDATE_KYC',
  UPDATE_KYC_COMPLETE: 'UPDATE_KYC_COMPLETE',
  UPDATE_KYC_ISSUE: 'UPDATE_KYC_ISSUE',
  POLL_KYC_STATUS: 'POLL_KYC_STATUS',
  POLL_KYC_STATUS_COMPLETE: 'POLL_KYC_STATUS_COMPLETE',
  POLL_KYC_STATUS_ISSUE: 'POLL_KYC_STATUS_ISSUE',
};

export const communityPollsActions = {
  GET_COMMUNITY_POLLS: 'GET_COMMUNITY_POLLS',
  GET_COMMUNITY_POLLS_SUCCESS: 'GET_COMMUNITY_POLLS_SUCCESS',
  GET_COMMUNITY_POLLS_ERROR: 'GET_COMMUNITY_POLLS_ERROR',
  ADD_NEW_POLL: 'ADD_NEW_POLL',
  ADD_NEW_POLL_SUCCESS: 'ADD_NEW_POLL_SUCCESS',
  ADD_NEW_POLL_ERROR: 'ADD_NEW_POLL_ERROR',
};

export const communityProjectsActions = {
  GET_COMMUNITY_PROJECTS: 'GET_COMMUNITY_PROJECTS',
  GET_COMMUNITY_PROJECTS_SUCCESS: 'GET_COMMUNITY_PROJECTS_SUCCESS',
  GET_COMMUNITY_PROJECTS_ERROR: 'GET_COMMUNITY_PROJECTS_ERROR',
  ADD_NEW_PROJECT: 'ADD_NEW_PROJECT',
  ADD_NEW_PROJECT_SUCCESS: 'ADD_NEW_PROJECT_SUCCESS',
  ADD_NEW_PROJECT_ERROR: 'ADD_NEW_PROJECT_ERROR',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  UPDATE_PROJECT_SUCCESS: 'UPDATE_PROJECT_SUCCESS',
  UPDATE_PROJECT_ERROR: 'UPDATE_PROJECT_ERROR',
  UPDATE_PROJECT_STATUS: 'UPDATE_PROJECT_STATUS',
  GET_PROJECT_POLL: 'GET_PROJECT_POLL',
  VOTE_ON_PROJECT: 'VOTE_ON_PROJECT',
  VOTE_ON_PROJECT_COMPLETE: 'VOTE_ON_PROJECT_COMPLETE',
  VOTE_ON_PROJECT_ISSUE: 'VOTE_ON_PROJECT_ISSUE',
  ADD_PROJECT_POLL: 'ADD_PROJECT_POLL',
  ADD_PROJECT_POLL_ISSUE: 'ADD_PROJECT_POLL_ISSUE',
};

export const communityTasksActions = {
  GET_COMMUNITY_TASKS: 'GET_COMMUNITY_TASKS',
  GET_COMMUNITY_TASKS_SUCCESS: 'GET_COMMUNITY_TASKS_SUCCESS',
  GET_COMMUNITY_TASKS_ERROR: 'GET_COMMUNITY_TASKS_ERROR',
  ADD_NEW_TASK: 'ADD_NEW_TASK',
  ADD_NEW_TASK_SUCCESS: 'ADD_NEW_TASK_SUCCESS',
  ADD_NEW_TASK_ERROR: 'ADD_NEW_TASK_ERROR',
  UPDATE_TASK: 'UPDATE_TASK',
  UPDATE_TASK_ISSUE: 'UPDATE_TASK_ISSUE',
  VOTE_ON_PROJECT_COMPLETE: 'VOTE_ON_PROJECT_COMPLETE',
  APPROVE_TASK: 'APPROVE_TASK',
  APPROVE_TASK_SUCCESS: 'APPROVE_TASK_SUCCESS',
  APPROVE_TASK_ERROR: 'APPROVE_TASK_ERROR',
};

export const voteActions = {
  VOTE: 'VOTE',
  VOTE_SUCCESS: 'VOTE_SUCCESS',
  VOTE_ERROR: 'VOTE_ERROR',
};

export const priceActions = {
  SET_PRICE_ETH: 'SET_PRICE_ETH',
  SET_PRICE_NTV: 'SET_PRICE_NTV',
  GET_CURRENT_PRICES: 'GET_CURRENT_PRICES',
};
