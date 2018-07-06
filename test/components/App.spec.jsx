import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import App from '../../src/components/App';

describe('App.js', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);

    expect(wrapper).toHaveLength(1);
  });
});
