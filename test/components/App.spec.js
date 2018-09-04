import { App } from '../../src/components/App';

describe('Home', () => {
  let wrapper;
  let props;
  let reduxState;

  beforeEach(() => {
    props = {
      getCommunities: jest.fn(),
    };
    reduxState = {
      router: {
        location: '',
      },
      user: {
        wallet: {
          address: '123',
        },
      },
    };
    wrapper = buildConnectedComponent(App, props, reduxState);
  });

  xit('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  xit('should call `getCommunities` on mount', () => {
    wrapper = buildComponent(App, { ...props, communities: [] }, mount);

    expect(wrapper.props().getCommunities).toHaveBeenCalled();
  });
});
