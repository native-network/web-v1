import React from 'react';
import SVG from 'react-inlinesvg';

import Menu from '../navigation/Menu';

import styles from './Footer.css';
import logo from '../../../assets/img/native-white-logo.svg';

function Footer({ user }) {
  const { address, role } = user;
  return (
    <footer className={styles.Footer}>
      <div className={styles.PrimaryFooter}>
        <SVG className={styles.FooterLogo} src={logo} />
        <nav className={styles.FooterNav}>
          <Menu
            role={role}
            address={address}
            hidden={false}
            menuClass={styles.FooterMenu}
            menuItemClass={styles.FooterMenuItem}
            linkClass={styles.FooterLink}
            menuItems={[
              {
                label: 'Terms and Conditions',
                path: '/',
              },
              {
                label: 'Support',
                path: '/support',
              },
              {
                label: 'Legal',
                path: '/',
              },
            ]}
          />
        </nav>
      </div>
      <div className={styles.FooterSocial}>
        <ul className={styles.SocialMedia}>
          <li>
            <img src="http://placehold.it/50x50" />
          </li>
          <li>
            <img src="http://placehold.it/50x50" />
          </li>
          <li>
            <img src="http://placehold.it/50x50" />
          </li>
          <li>
            <img src="http://placehold.it/50x50" />
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
