import React from 'react';
import classNames from 'classnames/bind';

import styles from './Button.css';

const cx = classNames.bind(styles);

function Button({
  className,
  theme,
  rounded,
  outline,
  centered,
  block,
  content,
  clickHandler,
  ...props
}) {
  const classes = cx({
    Button: true,
    Primary: theme === 'primary',
    Secondary: theme === 'secondary',
    Tertiary: theme === 'tertiary',
    White: theme === 'white',
    Rounded: rounded,
    Centered: centered,
    Outline: outline,
    Block: block,
    Link: theme === 'link',
  });

  return (
    <button
      {...props}
      onClick={clickHandler}
      className={`${classes} ${className}`}
    >
      {typeof content !== 'function' ? content : content()}
    </button>
  );
}

export default Button;
