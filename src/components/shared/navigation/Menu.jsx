import React from 'react';

import MenuItem from './MenuItem';

function Menu({
  hidden,
  menuClass,
  menuItemClass,
  linkClass,
  address,
  menuItems,
}) {
  return (
    <ul aria-hidden={hidden} className={menuClass}>
      <MenuItem
        menuItemClass={menuItemClass}
        linkClass={linkClass}
        path="/"
        label="All Communities"
        exact
      />
      {address && (
        <MenuItem
          menuItemClass={menuItemClass}
          linkClass={linkClass}
          path="/dashboard"
          label="Dashboard"
          exact
        />
      )}
      <li className={menuItemClass}>
        <a
          href="https://quickstart.nativeproject.one/"
          target="_blank"
          rel="noopener nofollow"
          className={linkClass}
        >
          Quickstart Guide
        </a>
      </li>
      <li className={menuItemClass}>
        <a
          href="https://nativeproject.zendesk.com/hc/en-us"
          target="_blank"
          rel="noopener nofollow"
          className={linkClass}
        >
          Learn
        </a>
      </li>
      {menuItems &&
        (menuItems || []).map((item, i) => (
          <MenuItem
            key={i}
            {...item}
            menuItemClass={menuItemClass}
            linkClass={linkClass}
          />
        ))}
    </ul>
  );
}

export default Menu;
