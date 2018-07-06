import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

const shortenedNav = (exact = false, to, name) => {
  return <NavLink exact={exact} activeClassName="active" to={to}>{name}</NavLink>;
};

class Navigation extends Component {
  render() {
    return (
      <nav role="navigation">
        {shortenedNav(true, '/', 'Home')}
      </nav>
    );
  }
}

export default Navigation;
