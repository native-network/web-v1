import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import { instance } from '../../src/requests';

import { tribeProjectsActions } from '../../src/actions/actionTypes';

import {
  getTribeProjects,
  addNewProject,
  updateProject,
} from '../../src/actions/tribeProjectsActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('tribeProjectsActions', () => {
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
  });

  describe('getTribeProjects', () => {
    beforeEach(() => moxios.install(instance));
    afterEach(() => moxios.uninstall(instance));

    it('should dispatch `GET_TRIBE_PROJECTS`', async () => {
      moxiosResponse({ status: 200 });
      await store.dispatch(getTribeProjects(3));

      const actions = store.getActions();
      const expectedAction = { type: tribeProjectsActions.GET_TRIBE_PROJECTS };

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

      it('should dispatch `GET_TRIBE_PROJECTS_SUCCESSS` on success', async () => {
        await store.dispatch(getTribeProjects(3));

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: tribeProjectsActions.GET_TRIBE_PROJECTS_SUCCESS,
          projects: response,
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });

    describe('success and error', () => {
      beforeEach(() => moxiosResponse({ status: 400 }));

      it('should dispatch `GET_TRIBE_PROJECTS_ERROR` on error', async () => {
        await store.dispatch(getTribeProjects());

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: tribeProjectsActions.GET_TRIBE_PROJECTS_ERROR,
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
      const expectedAction = { type: tribeProjectsActions.ADD_NEW_PROJECT };
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
          type: tribeProjectsActions.ADD_NEW_PROJECT_SUCCESS,
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
          type: tribeProjectsActions.ADD_NEW_PROJECT_ERROR,
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
          type: tribeProjectsActions.UPDATE_PROJECT_SUCCESS,
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
          type: tribeProjectsActions.UPDATE_PROJECT_ERROR,
          error: '',
        };
        expect(lastAction).toEqual(expectedAction);
      });
    });
  });
});
