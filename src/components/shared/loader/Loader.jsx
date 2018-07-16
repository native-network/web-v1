import React from 'react';

import styles from './Loader.css';

function Loader () {
  return (
    <div className={styles.LoaderBackground}>
      <div className={styles.Loader} />
    </div>
  );
}

export default Loader;
