import React, { Component } from 'react';
import SVG from 'react-inlinesvg';
import { connect } from 'react-redux';

import Menu from '../navigation/Menu';

import SocialMedia from '../social-media';

import styles from './Footer.css';
import logo from '../../../assets/img/native-white-logo.svg';

class Footer extends Component {
  render() {
    const { address, role } = this.props.user;
    return (
      <footer className={styles.Footer}>
        <div className={styles.FooterContainer}>
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
            <SocialMedia
              className={styles.SocialMedia}
              links={this.props.socialLinks}
            />
          </div>
        </div>
      </footer>
    );
  }
}

export default connect(
  (state) => {
    const native = (state.communities.communities || []).find(
      (c) => c.name === 'Native',
    );
    return {
      socialLinks: native && JSON.parse(native.socialLinks),
    };
  },
  null,
)(Footer);
