import { communityProjectsActions as actions } from './actionTypes';
import { beginAjaxCall } from './loadingActions';
import { pollStatus } from './sharedActions';
import { get, post } from '../requests';
import { toastrError, toastrSuccess } from './toastrActions';
import { communityContractInstance } from '../utils/constants';
import BigNumber from 'bignumber.js';
import { getWeb3ServiceInstance } from '../web3/Web3Service';
import { pendingTransactionComplete } from './currencyActions';

const { web3 } = getWeb3ServiceInstance();

const { toWei } = web3.utils;

export const getCommunityProjects = (id) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_COMMUNITY_PROJECTS });
    dispatch(beginAjaxCall());
    try {
      const { data } = await get(`communities/${id}/projects`);

      (data || [])
        .filter(
          (project) =>
            project.status === 'initialized' || /pending/.test(project.status),
        )
        .forEach((project) =>
          dispatch(pollStatus(project.id, 'projects', updateProject)),
        );

      return dispatch(getCommunityProjectsSuccess(data));
    } catch (err) {
      const { message } = err;
      dispatch(toastrError(message));
      return dispatch(getCommunityProjectsError(message));
    }
  };
};

export const getCommunityProjectsSuccess = (projects) => {
  return {
    type: actions.GET_COMMUNITY_PROJECTS_SUCCESS,
    projects,
  };
};

export const getCommunityProjectsError = (error) => {
  return {
    type: actions.GET_COMMUNITY_PROJECTS_ERROR,
    error,
  };
};

export const addNewProject = (project) => {
  return async (dispatch) => {
    dispatch({ type: actions.ADD_NEW_PROJECT });
    dispatch(beginAjaxCall());

    try {
      const { data } = await post('projects', project);
      const { id, contractId, totalCost, community, address } = data;

      const rewardBigNumber = toWei(new BigNumber(totalCost).toString());

      communityContractInstance(community)
        .then(({ community3 }) => {
          community3
            .createNewProject(contractId, rewardBigNumber, address, (hash) =>
              dispatch(pendingTransactionComplete({ hash })),
            )
            .then(() => {
              dispatch(
                toastrSuccess('Successfully created project, pending escrow'),
              );
              dispatch(addNewProjectSuccess(data));
              dispatch(pollStatus(id, 'projects', updateProject));
            })
            .catch((err) => {
              const { message } = err;
              dispatch(toastrError(message));
              dispatch(addNewProjectError(message));
            });
        })
        .catch((err) => {
          const { message } = err;
          dispatch(toastrError(message));
          dispatch(addNewProjectError(message));
        });
    } catch (err) {
      const { message } = err;
      dispatch(toastrError(message));
      return dispatch(addNewProjectError(message));
    }
  };
};

export const addNewProjectSuccess = (project) => {
  return {
    type: actions.ADD_NEW_PROJECT_SUCCESS,
    project,
  };
};

export const addNewProjectError = (error) => {
  return {
    type: actions.ADD_NEW_PROJECT_ERROR,
    error,
  };
};

export const updateProject = (project) => {
  return {
    type: actions.UPDATE_PROJECT,
    project,
  };
};

export const updateProjectStatus = ({ projectId, status }) => {
  return async (dispatch) => {
    dispatch({ type: actions.UPDATE_PROJECT_STATUS });
    dispatch(beginAjaxCall());
    try {
      const { data } = await post(`projects/${projectId}/updateStatus`, {
        status,
      });
      return dispatch(updateProjectSuccess(data));
    } catch (err) {
      const { message } = err;
      dispatch(toastrError(message));
      return dispatch(updateProjectError(message));
    }
  };
};

export const getCommunityPollById = (projectId, id) => {
  return async (dispatch) => {
    dispatch({ type: actions.GET_PROJECT_POLL });
    try {
      const { data: poll } = await get(`polls/${id}`);

      return dispatch(addCommunityProjectPoll(projectId, poll));
    } catch (err) {
      const { message } = err;

      return dispatch(addCommunityProjectPollIssue(message));
    }
  };
};

export const voteOnProject = (projectId, pollId, optionId) => {
  return async (dispatch) => {
    dispatch({ type: actions.VOTE_ON_PROJECT });

    try {
      const { data } = await post(`polls/${pollId}/vote`, { optionId });

      dispatch({ type: actions.VOTE_ON_PROJECT_COMPLETE });
      dispatch(toastrSuccess('Your vote has been cast for this project.'));
      dispatch(getCommunityPollById(projectId, data.id));
    } catch (err) {
      const { message } = err;
      dispatch(
        toastrError('There was a problem casting your vote. Please try again.'),
      );
      dispatch(voteOnProjectPollIssue(message));
    }
  };
};

export const voteOnProjectPollIssue = (error) => {
  return {
    type: actions.VOTE_ON_PROJECT_ISSUE,
    error,
  };
};

export const addCommunityProjectPoll = (projectId, poll) => {
  return {
    type: actions.ADD_PROJECT_POLL,
    projectId,
    poll,
  };
};

export const addCommunityProjectPollIssue = (error) => {
  return {
    type: actions.ADD_PROJECT_POLL_ISSUE,
    error,
  };
};

export const updateProjectSuccess = (project) => {
  return {
    type: actions.UPDATE_PROJECT_SUCCESS,
    project,
  };
};

export const updateProjectError = (error) => {
  return {
    type: actions.UPDATE_PROJECT_ERROR,
    error,
  };
};

export const rewardProjectCompletion = (project, community) => {
  return async (dispatch) => {
    pendingWeb3ConfirmationAction(
      'rewardProjectCompletion',
      'Successfully rewarded project completion, pending confirmation.',
      project,
      community,
      dispatch,
    );
  };
};

export const cancelProject = (project, community) => {
  return async (dispatch) => {
    pendingWeb3ConfirmationAction(
      'cancelProject',
      'Successfully released project fund to dev fund, pending confirmation.',
      project,
      community,
      dispatch,
    );
  };
};

const pendingWeb3ConfirmationAction = (
  method,
  successMessage,
  project,
  community,
  dispatch,
) => {
  dispatch(beginAjaxCall());
  try {
    const { projectId, contractId, status } = project;
    communityContractInstance(community)
      .then(({ community3 }) => {
        community3[method](contractId, (hash) =>
          dispatch(
            pendingTransactionComplete({
              hash,
            }),
          ),
        )
          .then(() => {
            dispatch(toastrSuccess(successMessage));
            dispatch(updateProjectStatus({ projectId, status }));
            dispatch(pollStatus(projectId, 'projects', updateProject));
            return dispatch(updateProjectSuccess(project));
          })
          .catch((err) => {
            const { message } = err;
            dispatch(toastrError(message));
            return dispatch(updateProjectError(message));
          });
      })
      .catch((err) => {
        const { message } = err;
        dispatch(toastrError(message));
        return dispatch(updateProjectError(message));
      });
  } catch (err) {
    const { message } = err;
    dispatch(toastrError(message));
    return dispatch(updateProjectError(message));
  }
};
