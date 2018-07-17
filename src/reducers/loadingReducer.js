import { loadingActions as loading } from '../actions/actionTypes';

function actionTypeEndsInSuccess(type) {
  return type && type.substring(type.length - 8) === '_SUCCESS';
}

function actionTypeEndsInError(type) {
  return type && type.substring(type.length - 6) === '_ERROR';
}

export default function loadingReducer(state = 0, action) {
  if (action.type === loading.LOADING) {
    return state + 1;
  } else if (
    actionTypeEndsInSuccess(action.type) ||
    actionTypeEndsInError(action.type)
  ) {
    return state - 1;
  }

  return state;
}
