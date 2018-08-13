import React from 'react';
import SVG from 'react-inlinesvg';

import styles from './Footer.css';
import logo from '../../../assets/img/native-white-logo.svg';

function Footer() {
  return (
    <footer>
      <div className={styles.Footer}>
        <div className={styles.FooterContainer}>
          <SVG className={styles.FooterLogo} src={logo} />
        </div>
        <div className={styles.SubFooter}>
          <div className={styles.FooterContainer}>
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
        </div>
      </div>
    </footer>
  );
}

export default Footer;
