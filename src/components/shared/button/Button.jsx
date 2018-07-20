import React from 'react';
import classNames from 'classnames/bind';

import styles from './Button.css';

const cx = classNames.bind(styles);

function Button ({theme, rounded, centered, content, clickHandler}) {

  const className = cx({
    Button: true,
    Primary: theme === 'primary',
    Secondary: theme === 'secondary',
    Tertiary: theme === 'tertiary',
    Rounded: rounded,
    Centered: centered
  });

  return (<button onClick={clickHandler} className={className}>{content}</button>);
}

export default Button;
