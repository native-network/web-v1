import React from 'react';

import styles from './Icon.css';

function Icon({ icon, className }) {
  return (
    <span
      className={`${styles.Icon} ${styles[`icon-${icon}`]} ${
        className ? className : null
      }`}
    />
  );
}

export default Icon;
