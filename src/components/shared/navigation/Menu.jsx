import React from 'react';

import MenuItem from './MenuItem';

function Menu({
  forwardRef,
  hidden,
  role,
  menuClass,
  menuItemClass,
  linkClass,
  address,
  menuItems,
}) {
  return (
    <ul
      ref={forwardRef ? forwardRef : null}
      aria-hidden={hidden}
      className={menuClass}
    >
      <MenuItem
        menuItemClass={menuItemClass}
        linkClass={linkClass}
        path="/"
        label="Communities"
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
      {(role === 'member' || role === 'curator') && (
        <MenuItem
          menuItemClass={menuItemClass}
          linkClass={linkClass}
          path="/settings"
          label="Settings"
          exact
        />
      )}
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
