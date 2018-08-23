import { tribeTasksActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get, post } from '../requests';

export const getTribeTasks = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_TRIBE_TASKS });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get(`tribes/${id}/tasks`);

      return dispatch(getTribeTasksSuccess(data));
    } catch (err) {
      const { message } = err;
      return dispatch(getTribeTasksError(message));
    }
  };
};

export const getTribeTasksSuccess = (tasks) => {
  return {
    type: actions.GET_TRIBE_TASKS_SUCCESS,
    tasks,
  };
};

export const getTribeTasksError = (error) => {
  return {
    type: actions.GET_TRIBE_TASKS_ERROR,
    error,
  };
};

export const addNewTask = (task) => {
  return async (dispatch) => {
    dispatch({ type: actions.ADD_NEW_TASK });
    dispatch(beginAjaxCall());

    try {
      const { data } = await post('tasks', task);

      return dispatch(addNewTaskSuccess(data));
    } catch (err) {
      const { message } = err;
      return dispatch(addNewTaskError(message));
    }
  };
};

export const addNewTaskSuccess = (task) => {
  return {
    type: actions.ADD_NEW_TASK_SUCCESS,
    task,
  };
};

export const addNewTaskError = (error) => {
  return {
    type: actions.ADD_NEW_TASK_ERROR,
    error,
  };
};
