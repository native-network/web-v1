import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import classNames from 'classnames/bind';

import Navigation from '../navigation';
import Notifications from '../notifications';
import NotificationsBadge from '../notifications-badge';
import WrongNetworkWarning from '../wrong-network-warning';

import logo from '../../../assets/img/native-white.svg';
import wallet from '../../../assets/img/wallet.svg';
import alarm from '../../../assets/img/alarm.svg';
import walletDisabled from '../../../assets/img/wallet-disabled.svg';

import styles from './Header.css';

const cx = classNames.bind(styles);

export class Header extends Component {
  state = {
    isModalOpen: false,
    isNotificationsOpen: false,
  };

  static defaultProps = {
    user: {
      wallet: {
        address: '',
      },
    },
    location: '',
    isLoggedIn: false,
  };

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }
  toggleNotifications() {
    this.setState({ isNotificationsOpen: !this.state.isNotificationsOpen });
  }
  render() {
    const walletSrc = this.props.user.wallet.address ? wallet : walletDisabled;
    const walletClass = cx({
      Wallet: true,
      Disabled: !this.props.user.wallet.address,
    });

    return (
      <header className={styles.Header}>
        <WrongNetworkWarning />
        <div className={styles.HeaderContainer}>
          <Link className={styles.LogoLink} to="/">
            <img className={styles.Logo} src={logo} alt="Native logo" />
          </Link>
          <SVG className={walletClass} src={walletSrc} />
          <div
            className={styles.NotificationsMenuItem}
            onClick={() => this.toggleNotifications()}
          >
            <SVG className={styles.Alarm} src={alarm} />
            <NotificationsBadge />
          </div>
          <Notifications active={this.state.isNotificationsOpen} />
          <Navigation location={this.props.location} user={this.props.user} />
        </div>
      </header>
    );
  }
}

export default Header;
