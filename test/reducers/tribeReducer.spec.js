import tribeReducer from '../../src/reducers/tribeReducer';
import { tribeActions as actions } from '../../src/actions/actionTypes';
import { initialState } from '../../src/reducers/initialState';
const initialTribeState = initialState.activeTribe;

describe('tribeReducer', () => {
  it('should return the initial state', () => {
    const reducedState = tribeReducer(undefined, {});
    expect(reducedState).toEqual(initialTribeState);
  });

  it('should add an active tribe to state for `GET_TRIBE_BY_ID_SUCCESS`', () => {
    const tribe = {
      id: 3,
      name: 'Foo',
    };
    const reducedState = tribeReducer(initialTribeState, {
      type: actions.GET_TRIBE_BY_ID_SUCCESS,
      tribe,
    });

    expect(reducedState).toEqual({
      ...initialTribeState,
      tribe,
    });
  });

  it('should add an error to state for `GET_TRIBE_BY_ID_ERROR`', () => {
    const error = 'Something went wrong';
    const reducedState = tribeReducer(initialTribeState, {
      type: actions.GET_TRIBE_BY_ID_ERROR,
      error,
    });
    expect(reducedState).toEqual({
      ...initialTribeState,
      error,
    });
  });

  it('should remove the active tribe for `CLEAR_ACTIVE_TRIBE`', () => {
    const newState = { ...initialState.activeTribe, tribe: { name: 'foo' } };
    const reducedState = tribeReducer(newState, {
      type: actions.CLEAR_ACTIVE_TRIBE,
    });

    expect(reducedState).toEqual(initialState);
  });
});
