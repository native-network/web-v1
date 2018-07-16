import Tag from '../../../../src/components/shared/tag';

describe('Tag', () => {
  let wrapper;

  it('should render without crashing', () => {
    wrapper = buildComponent(Tag);

    expect(wrapper).toHaveLength(1);
  });

  it('should render the name prop inside a `span`', () => {
    wrapper = buildComponent(Tag, {name: 'Foo'});
    const span = wrapper.find('span');

    expect(span).toHaveLength(1);
    expect(span.props().children).toEqual('Foo');
  });
});
