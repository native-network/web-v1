import React from 'react';
import styles from './Tag.css';

function Tag ({name}) {
  return <span className={styles.Tag}>{name}</span>;
}

export default Tag;
