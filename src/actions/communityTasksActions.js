import { communityTasksActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get, post } from '../requests';
import { toastrError, toastrSuccess } from './toastrActions';
import { communityContractInstance } from '../utils/constants';
import BigNumber from 'bignumber.js';
import { getWeb3ServiceInstance } from '../web3/Web3Service';

const { web3 } = getWeb3ServiceInstance();

const { toWei } = web3.utils;

export const getCommunityTasks = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_COMMUNITY_TASKS });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get(`communities/${id}/tasks`);

      (data || [])
        .filter((task) => task.status === 'initialized')
        .forEach((task) => dispatch(pollForEscrow(task.id)));

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
      const { id, reward, community } = data;

      const rewardBigNumber = toWei(new BigNumber(reward).toString());

      communityContractInstance(community)
        .then(({ community3 }) => {
          community3.createNewTask(id, rewardBigNumber).then(() => {
            dispatch(pollForEscrow(id));
            dispatch(
              toastrSuccess('Successfully created task, pending escrow'),
            );
            dispatch(addNewTaskSuccess(data));
          });
        })
        .catch((err) => {
          const { message } = err;
          dispatch(toastrError(message));
          dispatch(addNewTaskError(message));
        });
    } catch (err) {
      const { message } = err;
      dispatch(toastrError(message));
      return dispatch(addNewTaskError(message));
    }
  };
};

export const pollForEscrow = (taskId) => {
  return async (dispatch) => {
    const poll = setInterval(async () => {
      dispatch({ type: 'POLL_FOR_ESCROW' });
      const { data } = await get(`tasks/${taskId}`);

      if (data.status === 'escrowed') {
        clearInterval(poll);
        return dispatch(updateTask(data));
      }
    }, 1000 * 5);
  };
};

export const updateTask = (task) => {
  return {
    type: actions.UPDATE_TASK,
    task,
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
