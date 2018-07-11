import React from 'react';

import Header from '../../../src/components/header/Header';

fdescribe('Header', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Header />);
  });

  it('renders without crashing', () => {
    expect(wrapper).toHaveLength(1);
  });
});
