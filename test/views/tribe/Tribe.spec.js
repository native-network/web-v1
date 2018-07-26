import { Tribe } from '../../../src/views/tribe/Tribe';

describe('Tribe', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      id: 1,
      tribe: {
        name: 'Foo',
      },
      getTribeById: jest.fn(),
      clearActiveTribe: jest.fn(),
    };
    wrapper = buildComponent(Tribe, props);
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('calls `getTribeById` with props.id', () => {
    expect(props.getTribeById).toHaveBeenCalledWith(1);
  });

  it('calls `clearActiveTribe` on unmount', () => {
    wrapper = buildComponent(Tribe, props, mount);

    wrapper.unmount();

    expect(props.clearActiveTribe).toHaveBeenCalled();
  });
});
