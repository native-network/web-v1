import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/img/logo.svg';

import styles from './Navigation.css';

const shortenedNav = (exact = false, to, name) => {
  return <NavLink exact={exact} activeClassName="active" to={to}>{name}</NavLink>;
};

function Navigation () {
  return (
    <Fragment>
      <nav className={styles.navigation} role="navigation">
        {shortenedNav(true, '/', 'Home')}
        <img src={logo} alt="Native logo"/>
      </nav>
    </Fragment>
  );
}

export default Navigation;
