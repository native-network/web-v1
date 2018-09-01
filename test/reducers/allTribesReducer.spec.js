import allTribesReducer from '../../src/reducers/allTribesReducer';
import { allTribesActions as actions } from '../../src/actions/actionTypes';
import { initialState } from '../../src/reducers/initialState';
const initialTribesState = initialState.tribes;

describe('allTribesReducer', () => {
  it('should return the initial state', () => {
    const reducedState = allTribesReducer(undefined, {});

    expect(reducedState).toEqual(initialTribesState);
  });

  it('should add tribes to state for `GET_TRIBES_SUCCESS`', () => {
    const tribes = [{}, {}, {}];
    const reducedState = allTribesReducer(initialTribesState, {
      type: actions.GET_TRIBES_SUCCESS,
      tribes,
    });

    expect(reducedState).toEqual({
      ...initialTribesState,
      tribes: [...tribes],
    });
  });

  it('should add an error to state for `GET_TRIBES_ERROR`', () => {
    const error = 'Something went wrong';
    const reducedState = allTribesReducer(initialTribesState, {
      type: actions.GET_TRIBES_ERROR,
      error,
    });

    expect(reducedState).toEqual({
      ...initialTribesState,
      error,
    });
  });
});
