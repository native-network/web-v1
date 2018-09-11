import React from 'react';

import styles from './Icon.css';

function Icon({ icon }) {
  return <span className={`${styles.Icon} ${styles[`icon-${icon}`]}`} />;
}

export default Icon;
