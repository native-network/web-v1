import TabPanels from '../../../../src/components/shared/tab-panels';

describe('TabPanels', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      panels: [{}, {}, {}],
    };
    wrapper = buildComponent(TabPanels, props);
  });

  it('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
