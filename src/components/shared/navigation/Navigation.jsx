import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.css';

const shortenedNav = (exact = false, to, name) => {
  return (
    <li>
      <NavLink
          className={styles.NavLink}
          exact={exact}
          activeClassName="active"
          to={to}>
        {name}
      </NavLink>
    </li>
  );
};

function Navigation () {
  return (
    <nav className={styles.Navigation}>
      <ul>
        {shortenedNav(true, '/', 'All Tribes')}
        {shortenedNav(true, '/tribes', 'My Tribes')}
        {shortenedNav(true, '/tokens', 'My Tokens')}
        {shortenedNav(true, '/learn', 'Learn')}
      </ul>
    </nav>
  );
}

export default Navigation;
