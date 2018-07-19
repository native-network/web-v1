import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Button from '../button';

import logo from '../../../assets/img/logo.svg';
import metamask from '../../../assets/img/metamask.svg';

import styles from './Header.css';

const shortenedNav = (exact = false, to, name) => {
  return (
    <NavLink
        className={styles.NavLink}
        exact={exact}
        activeClassName={styles.NavLink_Active}
        to={to}>
      {name}
    </NavLink>
  );
};

function Header () {
  return (
    <header>
      <div className={styles.Header}>
        <Link className={styles.LogoLink} to="/">
          <img className={styles.Logo} src={logo} alt="Native logo"/>
        </Link>
        <nav className={styles.Navigation}>
          {shortenedNav(true, '/', 'All Tribes')}
          {shortenedNav(true, '/tribes', 'My Tribes')}
          {shortenedNav(true, '/tokens', 'My Tokens')}
          {shortenedNav(true, '/faq', 'Learn')}
        </nav>
        <div className={styles.metamask}>
          <img src={metamask} alt="Metamask Connected"/>
          <svg width="10px" height="10px" viewBox="0 0 10 10">
            <circle r="5" cx="5" cy="5" fill="#2C5E5E" />
          </svg>
        </div>
      </div>
      <div className={styles.Subheader}>
        <div className="container">
          <Button content="Get Native Tokens" />
        </div>
      </div>
    </header>
  );
}

export default Header;
