import { App } from '../../src/components/App';

describe('Home', () => {
  let wrapper;
  let props;
  let reduxState;

  beforeEach(() => {
    props = {
      getTribes: jest.fn(),
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

  xit('should call `getTribes` on mount', () => {
    wrapper = buildComponent(App, { ...props, tribes: [] }, mount);

    expect(wrapper.props().getTribes).toHaveBeenCalled();
  });
});
