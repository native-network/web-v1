import communitiesReducer from '../../src/reducers/communitiesReducer';
import { communitiesActions as actions } from '../../src/actions/actionTypes';
import { initialState } from '../../src/reducers/initialState';
const initialCommunitiesState = initialState.communities;

describe('communitiesReducer', () => {
  it('should return the initial state', () => {
    const reducedState = communitiesReducer(undefined, {});

    expect(reducedState).toEqual(initialCommunitiesState);
  });

  it('should add communities to state for `GET_COMMUNITIES_SUCCESS`', () => {
    const communities = [{}, {}, {}];
    const reducedState = communitiesReducer(initialCommunitiesState, {
      type: actions.GET_COMMUNITIES_SUCCESS,
      communities,
    });

    expect(reducedState).toEqual({
      ...initialCommunitiesState,
      communities: [...communities],
    });
  });

  it('should add an error to state for `GET_COMMUNITIES_ERROR`', () => {
    const error = 'Something went wrong';
    const reducedState = communitiesReducer(initialCommunitiesState, {
      type: actions.GET_COMMUNITIES_ERROR,
      error,
    });

    expect(reducedState).toEqual({
      ...initialCommunitiesState,
      error,
    });
  });
});
