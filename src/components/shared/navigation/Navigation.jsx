import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.css';

function Navigation({ role }) {
  return (
    <nav className={styles.Navigation}>
      <ul>
        <li>
          <NavLink
            className={styles.NavLink}
            exact
            activeClassName="active"
            to="/"
          >
            All Tribes
          </NavLink>
        </li>
        {role === 'curator' && (
          <li>
            <NavLink
              className={styles.NavLink}
              exact
              activeClassName="active"
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            className={styles.NavLink}
            exact
            activeClassName="active"
            to="/learn"
          >
            Learn
          </NavLink>
        </li>
        {role === 'curator' && (
          <li>
            <NavLink
              className={styles.NavLink}
              exact
              activeClassName="active"
              to="/manage"
            >
              Manage
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
