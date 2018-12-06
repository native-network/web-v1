import { communityTasksActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { get, post } from '../requests';
import { toastrError, toastrSuccess } from './toastrActions';
import { communityContractInstance } from '../utils/constants';
import BigNumber from 'bignumber.js';
import { getWeb3ServiceInstance } from '../web3/Web3Service';
import { pendingTransactionComplete } from './currencyActions';

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
      const { id, contractId, reward, community } = data;

      const rewardBigNumber = toWei(new BigNumber(reward).toString());

      communityContractInstance(community)
        .then(({ community3 }) => {
          community3
            .createNewTask(contractId, rewardBigNumber, (hash) =>
              dispatch(
                pendingTransactionComplete({
                  hash,
                }),
              ),
            )
            .then(() => {
              dispatch(pollForEscrow(id));
              dispatch(
                toastrSuccess('Successfully created task, pending escrow'),
              );
              dispatch(addNewTaskSuccess(data));
            })
            .catch((err) => {
              const { message } = err;
              dispatch(toastrError(message));
              dispatch(addNewTaskError(message));
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

export const declineClaimedTask = (taskId) => {
  return async (dispatch) => {
    try {
      const { data } = await post(`tasks/deny-claim`, { taskId });

      return dispatch(updateTask(data));
    } catch (err) {
      const { message } = err;
      return dispatch(updateTaskIssue(message));
    }
  };
};

export const cancelTask = (taskId) => {
  return async (dispatch, getState) => {
    dispatch(beginAjaxCall());
    const activeCommunity = getState().communities.communities.find(
      (c) => c.active,
    );
    const task = getState().tasks.tasks.find((task) => task.id === taskId);
    communityContractInstance(activeCommunity)
      .then(({ community3 }) => {
        community3
          .cancelTask(task && task.contractId, (hash) =>
            dispatch(
              pendingTransactionComplete({
                hash,
              }),
            ),
          )
          .then(async () => {
            try {
              const { data } = await post(`tasks/pending-cancellation`, {
                taskId,
              });
              return dispatch(updateTask(data));
            } catch (err) {
              const { message } = err;
              dispatch({ type: '_ERROR' });
              dispatch(toastrError(message));
              dispatch(updateTaskIssue(message));
            }
          })
          .then(() => {
            dispatch({ type: '_SUCCESS' });
            dispatch(
              toastrSuccess(
                'Successfully cancelled task, pending blockchain confirmation.',
              ),
            );
          })
          .catch((err) => {
            const { message } = err;
            dispatch(toastrError(message));
            dispatch(updateTaskIssue(message));
          });
      })
      .catch((err) => {
        const { message } = err;
        dispatch(toastrError(message));
        dispatch(updateTaskIssue(message));
      });
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

export const claimTask = (claimedTask) => {
  return async (dispatch) => {
    try {
      const { data } = await post(`tasks/claim`, claimedTask);
      dispatch(toastrSuccess('You have successfully claimed this task'));
      return dispatch(updateTask(data));
    } catch (err) {
      const { message } = err;
      return dispatch(updateTaskIssue(message));
    }
  };
};

export const submitTask = (submittedTask) => {
  return async (dispatch) => {
    try {
      const { data } = await post(`tasks/submit`, submittedTask);

      dispatch(toastrSuccess('Your message has been submitted to the curator'));
      return dispatch(updateTask(data));
    } catch (err) {
      const { message } = err;
      dispatch(toastrError(message));
      return dispatch(updateTaskIssue(message));
    }
  };
};

export const updateTask = (task) => {
  return {
    type: actions.UPDATE_TASK,
    task,
  };
};

export const updateTaskIssue = (error) => {
  return {
    type: actions.UPDATE_TASK_ISSUE,
    error,
  };
};

export const approveTask = (taskId) => {
  return async (dispatch) => {
    try {
      const { data } = await post(`tasks/approve`, { taskId });
      return dispatch(updateTask(data));
    } catch (err) {
      const { message } = err;

      dispatch(updateTaskIssue(message));
    }
  };
};

export const denySubmittedTask = (taskId) => {
  return async (dispatch) => {
    try {
      const { data } = await post(`tasks/deny-submission`, { taskId });

      return dispatch(updateTask(data));
    } catch (err) {
      const { message } = err;

      dispatch(updateTaskIssue(message));
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
