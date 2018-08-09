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
  content,
  clickHandler,
  ...props
}) {
  const classNames = cx({
    Button: true,
    Primary: theme === 'primary',
    Secondary: theme === 'secondary',
    Tertiary: theme === 'tertiary',
    Rounded: rounded,
    Centered: centered,
    Outline: outline,
  });

  return (
    <button
      {...props}
      onClick={clickHandler}
      className={`${classNames} ${className}`}
    >
      {content}
    </button>
  );
}

export default Button;
