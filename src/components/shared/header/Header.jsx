import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import Button from '../button';
import Navigation from '../navigation';
import Modal from '../modal';
import AuthenticatedStatus from '../authenticated-status';
import logo from '../../../assets/img/logo.svg';
import metamask from '../../../assets/img/metamask.svg';

import styles from './Header.css';

const cx = classNames.bind(styles);

export class Header extends Component {
  state = {
    isModalOpen: false,
  };

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    const metamaskClass = cx({
      Metamask: true,
      Disabled: !this.props.isLoggedIn,
    });

    return (
      <header>
        <div className={styles.Header}>
          <Link className={styles.LogoLink} to="/">
            <img className={styles.Logo} src={logo} alt="Native logo" />
          </Link>
          <Button
            outline
            theme="primary"
            clickHandler={this.openModal.bind(this)}
            content="Get NT"
          />
          <AuthenticatedStatus session={this.props.user.session} />
          <Navigation
            role={this.props.user.session && this.props.user.session.role}
          />
          <div className={metamaskClass}>
            <img src={metamask} alt="Metamask Connected" />
            <svg width="10px" height="10px" viewBox="0 0 10 10">
              <circle r="5" cx="5" cy="5" />
            </svg>
          </div>
        </div>
        <div className={styles.Subheader}>
          <div className="container" />
        </div>
        <Modal
          label="Lorem Ipsum"
          isOpen={this.state.isModalOpen}
          closeModal={this.closeModal.bind(this)}
        >
          <div>Foo</div>
        </Modal>
      </header>
    );
  }
}

export default Header;
