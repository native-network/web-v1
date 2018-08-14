import TabNavigation from '../../../../src/components/shared/tab-panels/TabNavigation';

describe('TabNavigation', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      panels: [{ name: 'panel1' }, { name: 'panel2' }, { name: 'panel3' }],
      clickHandler: jest.fn(),
    };
    wrapper = buildComponent(TabNavigation, props);
  });

  it('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render an `li` for each list item', () => {
    const items = wrapper.find('li');

    expect(items).toHaveLength(3);
  });
});
