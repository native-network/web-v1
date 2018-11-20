import { communityTasksActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get, post } from '../requests';
import { toastrError } from './toastrActions';
// import { toastrError, toastrSuccess } from './toastrActions';
import { communityContractInstance } from '../utils/constants';

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
      /* eslint-disable */
      console.log('data', data);
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

/* eslint-disable */

export const addNewContractTask = ({id, reward, community}) => {
  return async (dispatch) => {
    dispatch({ type: actions.ADD_NEW_CONTRACT_TASK });
    dispatch(beginAjaxCall());
   
      console.log('id', id)
      console.log('reward', reward)
      // console.log('address', address)
      // async function to create new contract task 

       communityContractInstance(community).then(({ community3 }) => {
        Promise.all([
          community3.createNewTask(id, reward),
        ]).then((data) => {
          console.log('data', data)
        })}).catch((err) => {
          console.log('err', err)
        })

      // dispatch(toastrSuccess('Successfully created contract task'))
      // return dispatch(addNewContractTaskSuccess(data));
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