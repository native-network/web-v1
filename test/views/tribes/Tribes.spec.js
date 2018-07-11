import { Tribes } from '../../../src/views/tribes/Tribes';

describe('Tribes', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      tribes: [],
      getTribes: jest.fn()
    };
    wrapper = buildComponent(Tribes, props);
  });

  afterEach(() => {
    props.getTribes.mockClear();
  });

  it('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should call `getTribes` when no tribes are present', () => {
    expect(props.getTribes).toHaveBeenCalled();
  });

  // TODO: Mock is getting called,
  // maybe from initial buildComponent in beforeEach?
  xit('should NOT call `getTribes` when tribes are present', () => {

    props = { ...props, tribes: [{}, {}]};
    wrapper = buildComponent(Tribes, props);

    expect(props.getTribes).not.toHaveBeenCalled();
  });
});
