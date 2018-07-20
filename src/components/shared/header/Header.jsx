import React from 'react';
import { Link } from 'react-router-dom';

import Button from '../button';
import Navigation from '../navigation';

import logo from '../../../assets/img/logo.svg';
import metamask from '../../../assets/img/metamask.svg';

import styles from './Header.css';

function Header () {
  return (
    <header>
      <div className={styles.Header}>
        <Link className={styles.LogoLink} to="/">
          <img className={styles.Logo} src={logo} alt="Native logo"/>
        </Link>
        <Navigation />
        <div className={styles.Metamask}>
          <img src={metamask} alt="Metamask Connected"/>
          <svg width="10px" height="10px" viewBox="0 0 10 10">
            <circle r="5" cx="5" cy="5" fill="#2C5E5E" />
          </svg>
        </div>
      </div>
      <div className={styles.Subheader}>
        <div className="container">
          <Button
              rounded
              theme="tertiary"
              clickHandler={() => alert('Clicked!')}
              content="Get Native Tokens"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
