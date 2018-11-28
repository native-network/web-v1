import { communityTasksActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get, post } from '../requests';
import { toastrError, toastrSuccess } from './toastrActions';
import { communityContractInstance } from '../utils/constants';
import BigNumber from 'bignumber.js';

export const getCommunityTasks = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_COMMUNITY_TASKS });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get(`communities/${id}/tasks`);

      return dispatch(getCommunityTasksSuccess(data));
    } catch (err) {
      const { message } = err;
      dispatch(toastrError(message));
      return dispatch(getCommunityTasksError(message));
    }
  };
};

export const getCommunityTasksSuccess = (tasks) => {
  return {
    type: actions.GET_COMMUNITY_TASKS_SUCCESS,
    tasks,
  };
};

export const getCommunityTasksError = (error) => {
  return {
    type: actions.GET_COMMUNITY_TASKS_ERROR,
    error,
  };
};

export const addNewTask = (task) => {
  return async (dispatch) => {
    dispatch({ type: actions.ADD_NEW_TASK });
    dispatch(beginAjaxCall());
    try {
      const { data } = await post('tasks', task);
      dispatch(addNewTaskSuccess(data));
      return dispatch(addNewContractTask(data));
    } catch (err) {
      const { message } = err;
      dispatch(toastrError(message));
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

export const addNewContractTask = ({ id, reward, community }) => {
  return async (dispatch) => {
    dispatch({ type: actions.ADD_NEW_CONTRACT_TASK });
    dispatch(beginAjaxCall());

    const rewardBigNumber = new BigNumber(reward).toString();

    communityContractInstance(community)
      .then(({ community3 }) => {
        community3.createNewTask(id, rewardBigNumber).then((data) => {
          dispatch(toastrSuccess('Successfully created contract task'));
          dispatch(addNewContractTaskSuccess(data));
        });
      })
      .catch((err) => {
        const { message } = err;
        dispatch(toastrError(message));
        dispatch(addNewContractTaskError(err));
      });
  };
};

export const addNewContractTaskSuccess = (task) => {
  return {
    type: actions.ADD_NEW_CONTRACT_TASK_SUCCESS,
    task,
  };
};

export const addNewContractTaskError = (error) => {
  return {
    type: actions.ADD_NEW_CONTRACT_TASK_ERROR,
    error,
  };
};
