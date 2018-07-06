import React from 'react';

import Navigation from '../../../src/components/navigation/Navigation';

describe('Navigation', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Navigation />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
