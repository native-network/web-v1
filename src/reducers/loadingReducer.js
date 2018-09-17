import { loadingActions as loading } from '../actions/actionTypes';
import { initialState } from './initialState';

function actionTypeEndsInSuccess(type) {
  return type && type.substring(type.length - 8) === '_SUCCESS';
}

function actionTypeEndsInError(type) {
  return type && type.substring(type.length - 6) === '_ERROR';
}

function actionTypeIsTransaction(type) {
  return type && (/TRANSACTION/.test(type) || /CURRENCY/.test(type));
}

export default function loadingReducer(state = initialState.loading, action) {
  if (action.type === loading.LOADING) {
    return state + 1;
  } else if (
    (actionTypeEndsInSuccess(action.type) ||
      actionTypeEndsInError(action.type)) &&
    !actionTypeIsTransaction(action.type)
  ) {
    return state - 1;
  }

  return state;
}
