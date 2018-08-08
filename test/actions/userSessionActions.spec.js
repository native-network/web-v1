import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { instance } from '../../src/requests';

import {
  loadingActions,
  userSessionActions,
} from '../../src/actions/actionTypes';

import {
  getUserSession,
  promptAuthorize,
} from '../../src/actions/userSessionActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('userSessionActions', () => {
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
  });

  describe('getUserSession', () => {
    beforeEach(() => moxios.install(instance));
    afterEach(() => moxios.uninstall(instance));

    it('should dispatch `GET_USER_SESSION`', async () => {
      moxiosResponse({ status: 200 });
      await store.dispatch(getUserSession());

      const actions = store.getActions();
      const expectedAction = { type: userSessionActions.GET_USER_SESSION };

      expect(actions[0]).toEqual(expectedAction);
    });

    it('should dispatch `LOADING` after `GET_USER_SESSION`', async () => {
      moxiosResponse({ status: 200 });
      await store.dispatch(getUserSession());

      const actions = store.getActions();
      const expectedActions = { type: loadingActions.LOADING };

      expect(actions[1]).toEqual(expectedActions);
    });

    it('should handle 3 actions', async () => {
      moxiosResponse({ status: 200 });
      await store.dispatch(getUserSession());

      const actions = store.getActions();
      expect(actions).toHaveLength(3);
    });

    describe('success response', () => {
      let response;

      beforeEach(() => {
        response = { session: { id: 'foo' } };
        moxiosResponse({ status: 200, response });
      });

      it('should finally dispatch `GET_USER_SESSION_SUCCESS` on success', async () => {
        await store.dispatch(getUserSession());

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: userSessionActions.GET_USER_SESSION_SUCCESS,
          session: response.session,
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });

    describe('error response', () => {
      let response;

      it('should finally dispatch `GET_USER_SESSION_ERROR` when no session is found', async () => {
        response = {};
        moxiosResponse({ status: 200, response });
        await store.dispatch(getUserSession());

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: userSessionActions.GET_USER_SESSION_ERROR,
          error: 'No user in session.',
        };

        expect(lastAction).toEqual(expectedAction);
      });

      it('should finally dispatch `GET_USER_SESSION_ERROR` on error response', async () => {
        response = 'Something went wrong';
        moxiosResponse({ status: 500, response });
        await store.dispatch(getUserSession());

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: userSessionActions.GET_USER_SESSION_ERROR,
          error: response,
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });
  });

  describe('promptAuthorize', () => {
    let address;

    beforeEach(() => (address = 'foo'), moxios.install(instance));
    afterEach(() => moxios.uninstall(instance));

    it('should dispatch `PROMPT_AUTHORIZE`', async () => {
      moxiosResponse({ status: 200 });
      await store.dispatch(promptAuthorize(address));

      const actions = store.getActions();
      const expectedAction = {
        type: userSessionActions.PROMPT_AUTHORIZE,
      };

      expect(actions[0]).toEqual(expectedAction);
    });

    it('should dispatch `LOADING` after `PROMPT_AUTHORIZE`', async () => {
      moxiosResponse({ status: 200 });
      await store.dispatch(promptAuthorize(address));

      const actions = store.getActions();
      const expectedAction = {
        type: loadingActions.LOADING,
      };

      expect(actions[1]).toEqual(expectedAction);
    });

    describe('success response', () => {
      it('should dispatch `PROMPT_SIGNATURE` on success response', async () => {
        moxiosResponse({ status: 200, response: { data: 'foo' } });
        await store.dispatch(promptAuthorize(address));
        const actions = store.getActions();
        const expectedAction = {
          type: userSessionActions.PROMPT_SIGNATURE,
        };

        expect(actions[2]).toEqual(expectedAction);
      });

      it('should finally dispatch `GET_USER_SESSION_ERROR` when no `data` is in response', async () => {
        moxiosResponse({ status: 200 });
        await store.dispatch(promptAuthorize(address));
        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: userSessionActions.GET_USER_SESSION_ERROR,
          error: 'No message to sign found.',
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });

    describe('error response', () => {
      beforeEach(() => moxiosResponse({ status: 400, response: 'foo' }));
      it('should finally dispatch `GET_USER_SESSION_ERROR` on error', async () => {
        await store.dispatch(getUserSession(address));

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: userSessionActions.GET_USER_SESSION_ERROR,
          error: 'foo',
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });
  });
});
