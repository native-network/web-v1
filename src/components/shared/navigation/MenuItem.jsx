import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.css';

function MenuItem({ label, path, exact }) {
  return (
    <li className={styles.MenuListItem}>
      <NavLink
        className={styles.MenuLink}
        exact={exact}
        activeClassName="active"
        to={path}
      >
        {label}
      </NavLink>
    </li>
  );
}

export default MenuItem;
