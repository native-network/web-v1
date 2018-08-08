import Card from '../../../../src/components/shared/card';

describe('Card', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      tribe: {
        id: 0,
        name: 'Foo',
        image: 'assets/image.jpg',
      },
      // render: jest.fn(),
    };
    wrapper = buildComponent(Card, props);
  });

  it('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
