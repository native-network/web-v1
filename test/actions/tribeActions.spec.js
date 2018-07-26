import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

import { loadingActions, tribeActions } from '../../src/actions/actionTypes';

import {
  getTribeById,
  clearActiveTribe,
  getTribeByIdSuccess,
  getTribeByIdError,
} from '../../src/actions/tribeActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('tribeActions', () => {
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
  });

  describe('getTribeById', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should dispatch `GET_TRIBE_BY_ID', async () => {
      moxios.wait(() => {
        let req = moxios.requests.mostRecent();
        req.respondWith({ status: 200 });
      });
      await store.dispatch(getTribeById(3));

      const actions = store.getActions();
      const expectedAction = { type: tribeActions.GET_TRIBE_BY_ID };

      expect(actions[0]).toEqual(expectedAction);
    });

    it('should dispatch `LOADING` after `GET_TRIBE_BY_ID`', async () => {
      moxios.wait(() => {
        let req = moxios.requests.mostRecent();
        req.respondWith({ status: 200 });
      });

      await store.dispatch(getTribeById(3));

      const actions = store.getActions();
      const expectedAction = { type: loadingActions.LOADING };

      expect(actions[1]).toEqual(expectedAction);
    });

    it('should handle 3 actions', async () => {
      moxios.wait(() => {
        let req = moxios.requests.mostRecent();
        req.respondWith({ status: 200 });
      });

      await store.dispatch(getTribeById(3));

      const actions = store.getActions();

      expect(actions).toHaveLength(3);
    });

    describe('success response', () => {
      let response;

      beforeEach(() => {
        response = {
          id: 3,
          name: 'Foo',
        };

        moxios.wait(() => {
          let req = moxios.requests.mostRecent();
          req.respondWith({ status: 200, response });
        });
      });

      it('should finally dispatch `GET_TRIBE_BY_ID_SUCCESS` on success', async () => {
        await store.dispatch(getTribeById(3));

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: tribeActions.GET_TRIBE_BY_ID_SUCCESS,
          tribe: response,
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });

    describe('error response', () => {
      let response;

      beforeEach(() => {
        response = 'Something went wrong';
        moxios.wait(() => {
          let req = moxios.requests.mostRecent();
          req.respondWith({ status: 400, response });
        });
      });

      it('should finally dispatch `GET_TRIBE_BY_ID_ERROR` on error', async () => {
        await store.dispatch(getTribeById(3));

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: tribeActions.GET_TRIBE_BY_ID_ERROR,
          error: new Error(response),
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });
  });

  describe('clearActiveTribe', () => {
    it('should create `CLEAR_ACTIVE_TRIBE` action', () => {
      const expectedAction = {
        type: tribeActions.CLEAR_ACTIVE_TRIBE,
      };

      expect(clearActiveTribe()).toEqual(expectedAction);
    });
  });

  describe('getTribeByIdSuccess', () => {
    it('should create `GET_TRIBE_BY_ID_SUCCESS` action with a given tribe', () => {
      const tribe = {
        id: 3,
        name: 'foo',
      };

      const expectedAction = {
        type: tribeActions.GET_TRIBE_BY_ID_SUCCESS,
        tribe,
      };

      expect(getTribeByIdSuccess(tribe)).toEqual(expectedAction);
    });
  });

  describe('getTribeByIdError', () => {
    it('should create `GET_TRIBE_BY_ID_ERROR` action with a given error', () => {
      const error = 'Something went wrong';
      const expectedAction = {
        type: tribeActions.GET_TRIBE_BY_ID_ERROR,
        error,
      };

      expect(getTribeByIdError(error)).toEqual(expectedAction);
    });
  });
});
