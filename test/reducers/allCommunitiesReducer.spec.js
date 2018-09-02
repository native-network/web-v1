import allCommunitiesReducer from '../../src/reducers/allCommunitiesReducer';
import { allCommunitiesActions as actions } from '../../src/actions/actionTypes';

const initialState = {
  communities: [],
  error: '',
};

describe('allCommunitiesReducer', () => {
  it('should return the initial state', () => {
    const reducedState = allCommunitiesReducer(undefined, {});

    expect(reducedState).toEqual(initialState);
  });

  it('should add communities to state for `GET_COMMUNITIES_SUCCESS`', () => {
    const communities = [{}, {}, {}];
    const reducedState = allCommunitiesReducer(initialState, {
      type: actions.GET_COMMUNITIES_SUCCESS,
      communities,
    });

    expect(reducedState).toEqual({
      ...initialState,
      communities: [...communities],
    });
  });

  it('should add an error to state for `GET_COMMUNITIES_ERROR`', () => {
    const error = 'Something went wrong';
    const reducedState = allCommunitiesReducer(initialState, {
      type: actions.GET_COMMUNITIES_ERROR,
      error,
    });

    expect(reducedState).toEqual({
      ...initialState,
      error,
    });
  });
});
