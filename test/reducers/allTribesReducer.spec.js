import allTribesReducer from '../../src/reducers/allTribesReducer';
import { allTribesActions as actions } from '../../src/actions/actionTypes';
import { initialState } from '../../src/reducers/initialState';

describe('allTribesReducer', () => {
  it('should return the initial state', () => {
    const reducedState = allTribesReducer(undefined, {});

    expect(reducedState).toEqual(initialState);
  });

  it('should add tribes to state for `GET_TRIBES_SUCCESS`', () => {
    const tribes = [{}, {}, {}];
    const reducedState = allTribesReducer(initialState, {
      type: actions.GET_TRIBES_SUCCESS,
      tribes,
    });

    expect(reducedState).toEqual({
      ...initialState,
      tribes: [...tribes],
    });
  });

  it('should add an error to state for `GET_TRIBES_ERROR`', () => {
    const error = 'Something went wrong';
    const reducedState = allTribesReducer(initialState, {
      type: actions.GET_TRIBES_ERROR,
      error,
    });

    expect(reducedState).toEqual({
      ...initialState,
      error,
    });
  });
});
