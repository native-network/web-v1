import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moxios from 'moxios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;

global.buildComponent = (Component, props, render = shallow) => {
  return render(<Component {...props} />);
};

global.buildConnectedComponent = (
  Component,
  props,
  initialState = {},
  render = shallow,
) => {
  return render(
    <Component {...props} store={mockStore(initialState)} />,
  ).dive(); // necessary to get to actual component instead of HOC
};

global.moxiosResponse = (res) => {
  return moxios.wait(() => {
    let req = moxios.requests.mostRecent();
    req.respondWith(res);
  });
};
