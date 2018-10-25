import React from 'react';
import tooltipImg from '../../../assets/img/tooltip.svg';
import styles from './Tooltip.css';

const Tooltip = ({ message }) => {
  return (
    <div className={styles.tooltip}>
      <img src={tooltipImg} />
      <div className={styles.popper}>{message}</div>
    </div>
  );
};

export default Tooltip;
