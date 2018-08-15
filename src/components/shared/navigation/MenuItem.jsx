import React from 'react';
import { NavLink } from 'react-router-dom';

function MenuItem({ label, menuItemClass, linkClass, path, exact }) {
  return (
    <li className={menuItemClass}>
      <NavLink
        className={linkClass}
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
