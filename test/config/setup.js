import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moxios from 'moxios';

Enzyme.configure({ adapter: new Adapter() });

const buildComponent = (Component, props, render = shallow) => {
  return render(<Component {...props} />);
};

global.shallow = shallow;
global.render = render;
global.mount = mount;

global.buildComponent = buildComponent;

global.moxiosResponse = (res) => {
  return moxios.wait(() => {
    let req = moxios.requests.mostRecent();
    req.respondWith(res);
  });
};
