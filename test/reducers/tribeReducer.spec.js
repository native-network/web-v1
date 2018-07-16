import tribeReducer from '../../src/reducers/tribeReducer';
import { tribeActions as actions } from '../../src/actions/actionTypes';

const initialState = {
  tribe: {},
  error: ''
};

describe('tribeReducer', () => {
  it('should return the initial state', () => {
    const reducedState = tribeReducer(undefined, {});

    expect(reducedState).toEqual(initialState);
  });

  it('should add an active tribe to state for `GET_TRIBE_BY_ID_SUCCESS`', () => {
    const tribe = {
      id: 3,
      name: 'Foo'
    };
    const reducedState = tribeReducer(initialState, {
      type: actions.GET_TRIBE_BY_ID_SUCCESS,
      tribe
    });

    expect(reducedState).toEqual({
      ...initialState,
      tribe
    });

  });

  it('should add an error to state for `GET_TRIBE_BY_ID_ERROR`', () => {
    const error = 'Something went wrong';
    const reducedState = tribeReducer(initialState, {
      type: actions.GET_TRIBE_BY_ID_ERROR,
      error
    });

    expect(reducedState).toEqual({
      ...initialState,
      error
    });
  });

  it('should remove the active tribe for `CLEAR_ACTIVE_TRIBE`', () => {
    const newState = { ...initialState, tribe: { name: 'foo' } };
    const reducedState = tribeReducer(newState, {
      type: actions.CLEAR_ACTIVE_TRIBE
    });

    expect(reducedState).toEqual(initialState);
  });
});
