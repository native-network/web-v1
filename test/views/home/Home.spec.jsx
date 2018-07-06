import React from 'react';

import { Home } from '../../../src/views/home/Home';

describe('Home', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Home />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
