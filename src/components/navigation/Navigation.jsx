import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/img/logo.svg';

<<<<<<< HEAD
=======
import styles from './Navigation.css';

>>>>>>> b4ad5ab... init css-modules config
const shortenedNav = (exact = false, to, name) => {
  return <NavLink exact={exact} activeClassName="active" to={to}>{name}</NavLink>;
};

function Navigation () {
  return (
    <Fragment>
<<<<<<< HEAD
      <nav role="navigation">
=======
      <nav className={styles.navigation} role="navigation">
>>>>>>> b4ad5ab... init css-modules config
        {shortenedNav(true, '/', 'Home')}
        <img src={logo} alt="Native logo"/>
      </nav>
<<<<<<< HEAD
      <img src={logo} alt="Native logo"/>
=======
>>>>>>> b4ad5ab... init css-modules config
    </Fragment>
  );
}

export default Navigation;
