import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { instance } from '../../src/requests';

import {
  loadingActions,
  allTribesActions,
} from '../../src/actions/actionTypes';

import {
  getTribes,
  getTribesSuccess,
  getTribesError,
  addNewTribe,
} from '../../src/actions/allTribesActions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('allTribesActions', () => {
  let initialState;
  let store;

  beforeEach(() => {
    initialState = {};
    store = mockStore(initialState);
  });

  describe('getTribes', () => {
    beforeEach(() => moxios.install(instance));
    afterEach(() => moxios.uninstall(instance));

    it('should dispatch `GET_TRIBES`', async () => {
      moxios.wait(() => {
        let req = moxios.requests.mostRecent();
        req.respondWith({ status: 200 });
      });
      await store.dispatch(getTribes());

      const actions = store.getActions();
      const expectedActions = { type: allTribesActions.GET_TRIBES };

      expect(actions[0]).toEqual(expectedActions);
    });

    it('should dispatch `LOADING` after `GET_TRIBES`', async () => {
      moxios.wait(() => {
        let req = moxios.requests.mostRecent();
        req.respondWith({ status: 200 });
      });
      await store.dispatch(getTribes());

      const actions = store.getActions();
      const expectedActions = { type: loadingActions.LOADING };

      expect(actions[1]).toEqual(expectedActions);
    });

    it('should handle 3 actions', async () => {
      moxios.wait(() => {
        let req = moxios.requests.mostRecent();
        req.respondWith({ status: 200 });
      });

      await store.dispatch(getTribes());

      const actions = store.getActions();

      expect(actions).toHaveLength(3);
    });

    describe('success response', () => {
      let response;

      beforeEach(() => {
        response = [{ name: 'foo' }, { name: 'bar' }, { name: 'baz' }];
        moxios.wait(() => {
          let req = moxios.requests.mostRecent();
          req.respondWith({ status: 200, response });
        });
      });

      it('should finally dispatch `GET_TRIBES_SUCCESS` on success', async () => {
        await store.dispatch(getTribes());

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: allTribesActions.GET_TRIBES_SUCCESS,
          tribes: response,
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

      it('should finally dispatch `GET_TRIBES_ERROR` on error', async () => {
        await store.dispatch(getTribes());

        const actions = store.getActions();
        const lastAction = actions[actions.length - 1];
        const expectedAction = {
          type: allTribesActions.GET_TRIBES_ERROR,
          error: new Error(response),
        };

        expect(lastAction).toEqual(expectedAction);
      });
    });
  });

  describe('getTribesSuccess', () => {
    it('should create `GET_TRIBES_SUCCESS` action with given tribes', () => {
      const tribes = [{ name: 'Foo' }, { name: 'Bar' }, { name: 'Baz' }];
      const expectedAction = {
        type: allTribesActions.GET_TRIBES_SUCCESS,
        tribes,
      };

      expect(getTribesSuccess(tribes)).toEqual(expectedAction);
    });
  });

  describe('getTribesError', () => {
    it('should create `GET_TRIBES_ERROR` action with an error message', () => {
      const error = 'Something went wrong';
      const expectedAction = {
        type: allTribesActions.GET_TRIBES_ERROR,
        error,
      };

      expect(getTribesError(error)).toEqual(expectedAction);
    });
  });

  describe('addNewTribe', () => {
    let tribe;

    beforeEach(() => (tribe = {}), moxios.install(instance));
    afterEach(() => moxios.uninstall(instance));

    it('should dispatch `ADD_NEW_TRIBE`', async () => {
      moxios.wait(() => {
        let req = moxios.requests.mostRecent();
        req.respondWith({ status: 200 });
      });
      await store.dispatch(addNewTribe(tribe));

      const actions = store.getActions();
      const expectedAction = { type: allTribesActions.ADD_NEW_TRIBE };

      expect(actions[0]).toEqual(expectedAction);
    });

    it('should dispatch `LOADING` after `ADD_NEW_TRIBE`', async () => {
      moxios.wait(() => {
        let req = moxios.requests.mostRecent();
        req.respondWith({ status: 200 });
      });

      await store.dispatch(addNewTribe(tribe));

      const actions = store.getActions();
      const expectedAction = { type: loadingActions.LOADING };

      expect(actions[1]).toEqual(expectedAction);
    });
  });
});
