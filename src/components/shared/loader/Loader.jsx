import React from 'react';
import classNames from 'classnames/bind';

import styles from './Loader.css';
const cx = classNames.bind(styles);

function Loader({ isFullScreen }) {
  const className = cx({
    LoaderBackground: true,
    FullScreen: isFullScreen,
  });
  return (
    <div className={className}>
      <div className={styles.Loader} />
    </div>
  );
}

export default Loader;
