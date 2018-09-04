import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import { instance } from '../../src/requests';

import { communityProjectsActions } from '../../src/actions/actionTypes';

import {
  getCommunityProjects,
  addNewProject,
  updateProject,
} from '../../src/actions/communityProjectsActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('communityProjectsActions', () => {
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
  });

  describe('getCommunityProjects', () => {
    beforeEach(() => moxios.install(instance));
    afterEach(() => moxios.uninstall(instance));

    it('should dispatch `GET_COMMUNITY_PROJECTS`', async () => {
      moxiosResponse({ status: 200 });
      await store.dispatch(getCommunityProjects(3));

      const actions = store.getActions();
      const expectedAction = {
        type: communityProjectsActions.GET_COMMUNITY_PROJECTS,
      };

      expect(actions[0]).toEqual(expectedAction);
    });

    describe('success', () => {
      let response;
      beforeEach(() => {
        response = {
          data: {
            projects: [],
          },
        };
        moxiosResponse({ status: 200, response });
      });

      it('should dispatch `GET_COMMUNITY_PROJECTS_SUCCESSS` on success', async () => {
        await store.dispatch(getCommunityProjects(3));

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: communityProjectsActions.GET_COMMUNITY_PROJECTS_SUCCESS,
          projects: response,
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });

    describe('success and error', () => {
      beforeEach(() => moxiosResponse({ status: 400 }));

      it('should dispatch `GET_COMMUNITY_PROJECTS_ERROR` on error', async () => {
        await store.dispatch(getCommunityProjects());

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: communityProjectsActions.GET_COMMUNITY_PROJECTS_ERROR,
          error: '',
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });
  });

  describe('addNewProject', () => {
    beforeEach(() => moxios.install(instance));
    afterEach(() => moxios.uninstall(instance));

    it('should dispatch `ADD_NEW_PROJECT`', async () => {
      const project = {};
      moxiosResponse({ status: 200 });
      await store.dispatch(addNewProject(project));

      const actions = store.getActions();
      const expectedAction = { type: communityProjectsActions.ADD_NEW_PROJECT };
      expect(actions[0]).toEqual(expectedAction);
    });

    describe('success and error', () => {
      let response;
      beforeEach(() => {
        response = {
          data: {
            project: {},
          },
        };
      });

      it('should dispatch `ADD_NEW_PROJECT_SUCCESS` on success', async () => {
        moxiosResponse({ status: 200, response });
        await store.dispatch(addNewProject({}));

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: communityProjectsActions.ADD_NEW_PROJECT_SUCCESS,
          project: response,
        };
        expect(lastAction).toEqual(expectedAction);
      });

      it('should dispatch `ADD_NEW_PROJECT_ERROR` on error', async () => {
        moxiosResponse({ status: 400 });
        await store.dispatch(addNewProject({}));

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: communityProjectsActions.ADD_NEW_PROJECT_ERROR,
          error: '',
        };
        expect(lastAction).toEqual(expectedAction);
      });
    });
  });

  describe('updateProject', () => {
    beforeEach(() => moxios.install(instance));
    afterEach(() => moxios.uninstall(instance));

    it('should dispatch `UPDATE_PROJECT`', async () => {
      moxiosResponse({ status: 200 });
      await store.dispatch(updateProject());
    });
    describe('success and error', () => {
      let response;
      beforeEach(() => {
        response = {
          data: {
            project: {},
          },
        };
      });

      it('should dispatch `UPDATE_PROJECT_SUCCESS` on success', async () => {
        moxiosResponse({ status: 200, response });
        await store.dispatch(updateProject(3, {}));

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: communityProjectsActions.UPDATE_PROJECT_SUCCESS,
          project: response,
        };
        expect(lastAction).toEqual(expectedAction);
      });

      it('should dispatch `UPDATE_PROJECT_ERROR` on error', async () => {
        moxiosResponse({ status: 400 });
        await store.dispatch(updateProject(3, {}));

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: communityProjectsActions.UPDATE_PROJECT_ERROR,
          error: '',
        };
        expect(lastAction).toEqual(expectedAction);
      });
    });
  });
});
