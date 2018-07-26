import { Tribes } from '../../../src/views/tribes/Tribes';

describe('Tribes', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      tribes: [],
      getTribes: jest.fn(),
    };
  });

  afterEach(() => {
    props.getTribes.mockClear();
  });

  it('should render without crashing', () => {
    wrapper = buildComponent(Tribes, props);
    expect(wrapper).toHaveLength(1);
  });

  it('should call `getTribes` when no tribes are present', () => {
    wrapper = buildComponent(Tribes, props);
    expect(props.getTribes).toHaveBeenCalled();
  });

  it('should NOT call `getTribes` when tribes are present', () => {
    props = { ...props, tribes: [{}, {}] };
    wrapper = buildComponent(Tribes, props);

    expect(props.getTribes).not.toHaveBeenCalled();
  });
});
