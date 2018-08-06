import CardList from '../../../../src/components/shared/card-list';

describe('CardList', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      listItems: [{}, {}, {}],
    };
    wrapper = buildComponent(CardList, props);
  });

  it('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });

  it('should render an `li` for each list item', () => {
    const items = wrapper.find('li');

    expect(items).toHaveLength(3);
  });

  it('should render a `Card` component for each list item', () => {
    const cards = wrapper.find('Card');

    expect(cards).toHaveLength(3);
  });
});
