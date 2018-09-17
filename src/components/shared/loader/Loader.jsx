import React from 'react';
import classNames from 'classnames/bind';

import SVG from 'react-inlinesvg';

import loader from '../../../assets/img/loader.svg';

import styles from './Loader.css';
const cx = classNames.bind(styles);

function Loader({ isFullScreen }) {
  const className = cx({
    LoaderBackground: true,
    FullScreen: isFullScreen,
  });
  return (
    <div className={className}>
      <SVG className={styles.Loader} src={loader} />
    </div>
  );
}

export default Loader;
