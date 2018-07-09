import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/img/logo.svg';

import styles from './Header.css';

const shortenedNav = (exact = false, to, name) => {
  return <NavLink exact={exact} activeClassName="active" to={to}>{name}</NavLink>;
};

console.log(styles);
function Header () {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation} role="navigation">
        {shortenedNav(true, '/', 'Home')}
      </nav>
      <img className={styles.logo} src={logo} alt="Native logo"/>
    </header>
  );
}

export default Header;
