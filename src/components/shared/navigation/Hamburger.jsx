import React from 'react';
import classNames from 'classnames/bind';

import styles from './Navigation.css';

function Hamburger({ active, clickHandler }) {
  const cx = classNames.bind(styles);

  const classes = cx({
    Hamburger: true,
    Active: active,
  });
  return (
    <button
      aria-expanded={active}
      aria-haspopup="true"
      className={classes}
      theme="primary"
      onClick={clickHandler}
      aria-label="Toggle the Primary Menu"
    >
      <span />
      <span />
      <span />
    </button>
  );
}

export default Hamburger;
