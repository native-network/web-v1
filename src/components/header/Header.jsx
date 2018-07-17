import React from 'react';
import { Link, NavLink } from 'react-router-dom';

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
    </NavLink>
  );
};

function Header () {
  return (
    <header className={styles.header}>
      <div className="container">
        <Link to="/">
          <img className={styles.logo} src={logo} alt="Native logo"/>
        </Link>
        <nav className={styles.navigation}>
          {shortenedNav(true, '/', 'Home')}
          {shortenedNav(true, '/tribes', 'Tribes')}
        </nav>
        <div className={styles.userIcon}>
          <img src="http://placehold.it/50x50" alt=""/>
        </div>
      </div>
    </header>
  );
}

export default Header;
