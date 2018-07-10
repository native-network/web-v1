import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/img/logo.svg';

const shortenedNav = (exact = false, to, name) => {
  return <NavLink exact={exact} activeClassName="active" to={to}>{name}</NavLink>;
};

function Navigation () {
  return (
    <Fragment>
      <nav role="navigation">
        {shortenedNav(true, '/', 'Home')}
      </nav>
      <img src={logo} alt="Native logo"/>
    </Fragment>
  );
}

export default Navigation;
