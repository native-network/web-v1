import { Communities } from '../../../src/views/communities/Communities';

describe('Communities', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      communities: [],
      getCommunities: jest.fn(),
    };
  });

  afterEach(() => {
    props.getCommunities.mockClear();
  });

  it('should render without crashing', () => {
    wrapper = buildComponent(Communities, props);
    expect(wrapper).toHaveLength(1);
  });

  it('should call `getCommunities` when no communities are present', () => {
    wrapper = buildComponent(Communities, props);
    expect(props.getCommunities).toHaveBeenCalled();
  });

  it('should NOT call `getCommunities` when communities are present', () => {
    props = { ...props, communities: [{}, {}] };
    wrapper = buildComponent(Communities, props);

    expect(props.getCommunities).not.toHaveBeenCalled();
  });
});
