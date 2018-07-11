import React from 'react';
import classNames from 'classnames/bind';

import styles from './Button.css';

const cx = classNames.bind(styles);

function Button ({theme, content, onClick}) {

  const className = cx({
    Button: true,
    Primary: theme === 'primary'
  });

  return (<button onClick={onClick} className={className}>{content}</button>);
}

export default Button;
