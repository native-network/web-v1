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
                toastrSuccess('Successfully created task, pending escrow'),
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
