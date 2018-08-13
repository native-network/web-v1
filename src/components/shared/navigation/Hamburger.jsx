import React from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames/bind';

import styles from './Navigation.css';

function Hamburger({ active, clickHandler }) {
  const cx = classNames.bind(styles);

  const classes = cx({
    Hamburger: true,
    Active: active,
    Inactive: !active,
  });
  return (
    <CSSTransition
      in={active}
      timeout={250}
      classNames={{
        enter: styles.TransitionActive,
        enterDone: styles.Active,
        exit: styles.TransitionInactive,
        exitDone: styles.Inactive,
      }}
    >
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
    </CSSTransition>
  );
}

export default Hamburger;
