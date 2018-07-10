import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/img/logo.svg';

import styles from './Header.css';

const shortenedNav = (exact = false, to, name) => {
  return (
    <NavLink
        className={styles.navLink}
        exact={exact}
        activeClassName="active"
        to={to}>
      {name}
    </NavLink>);
};

function Header () {
  return (
    <header className={styles.header}>
      <div className="container">
        <img className={styles.logo} src={logo} alt="Native logo"/>
        <nav className={styles.navigation} role="navigation">
          {shortenedNav(true, '/', 'Home')}
          {shortenedNav(true, '/tribes', 'Tribes')}
        </nav>
      </div>
    </header>
  );
}

export default Header;
