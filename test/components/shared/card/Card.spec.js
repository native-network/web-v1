import Card from '../../../../src/components/shared/card';

describe('Card', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {
      community: {
        id: 0,
        name: 'Foo',
        image: 'assets/image.jpg',
      },
      // render: jest.fn(),
    };
    wrapper = buildComponent(Card, props, mount);
  });

  it('should render without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
