import Navigation from '../../../../src/components/shared/navigation';

describe('Navigation', () => {
  let wrapper;

  beforeEach(() => (wrapper = buildComponent(Navigation)));

  it('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
