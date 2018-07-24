import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import Button from '../button';
import Navigation from '../navigation';
import Modal from '../modal';

import logo from '../../../assets/img/logo.svg';
import metamask from '../../../assets/img/metamask.svg';

import styles from './Header.css';

const cx = classNames.bind(styles);

export class Header extends Component {

  state = {
    isModalOpen: false
  }

  openModal() {
    this.setState({isModalOpen: true});
  }

  closeModal() {
    this.setState({isModalOpen: false});
  }

  render() {
    const metamaskClass = cx({
      Metamask: true,
      Disabled: !this.props.isLoggedIn
    });

    return (
      <header>
        <div className={styles.Header}>
          <Link className={styles.LogoLink} to="/">
            <img className={styles.Logo} src={logo} alt="Native logo"/>
          </Link>
          <Button
              rounded
              outline
              theme="primary"
              clickHandler={this.openModal.bind(this)}
              content="Get NT"
          />
          <Navigation />
          <div className={metamaskClass}>
            <img src={metamask} alt="Metamask Connected"/>
            <svg width="10px" height="10px" viewBox="0 0 10 10">
              <circle r="5" cx="5" cy="5" />
            </svg>
          </div>
        </div>
        <div className={styles.Subheader}>
          <div className="container">
          </div>
        </div>
        <Modal
            title="Lorem Ipsum"
            isModalOpen={this.state.isModalOpen}
            closeModal={this.closeModal.bind(this)}
            render={() => {
              return (
                <div>Foo
                </div>
              );
            }}
        />
      </header>
    );
  }
}

export default Header;
