import React, { Fragment } from 'react';

import metamask from '../../../../assets/img/metamask.svg';
import styles from '../WelcomeDialog.css';

export default function MetamaskButton({ link, content, clickHandler }) {
  const buttonClass = `${styles.MetamaskButton} ${styles.WelcomeButton}`;

  const renderElement = (children) => {
    return link ? (
      <a
        className={buttonClass}
        target="_blank"
        rel="noopen nofollow"
        href={link}
      >
        {children}
      </a>
    ) : (
      <button className={buttonClass} onClick={clickHandler}>
        {children}
      </button>
    );
  };

  return renderElement(
    <Fragment>
      <img src={metamask} alt="" />
      <span>{content}</span>
    </Fragment>,
  );
}
