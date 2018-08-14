import React, { Component } from 'react';
import classNames from 'classnames/bind';

import Hamburger from './Hamburger';
import Menu from './Menu';

import styles from './Navigation.css';

const cx = classNames.bind(styles);

class Navigation extends Component {
  state = {
    isMenuActive: false,
  };

  static defaultProps = {
    user: {
      role: '',
    },
  };

  componentDidUpdate(prevProps) {
    const { location: oldLocation } = prevProps;
    const { location: newLocation } = this.props;

    if (oldLocation !== newLocation) {
      this.setState({ isMenuActive: false });
    }
  }

  toggleMenu() {
    this.setState({ isMenuActive: !this.state.isMenuActive });
  }

  render() {
    const { role, address } = this.props.user;

    const classes = cx({
      PrimaryMenu: true,
      MenuOpen: this.state.isMenuActive,
    });

    return (
      <div className={styles.Navigation}>
        <nav>
          <Hamburger
            active={this.state.isMenuActive}
            clickHandler={this.toggleMenu.bind(this)}
          />
          <Menu
            address={address}
            role={role}
            hidden={!this.state.isMenuActive}
            menuClass={classes}
            menuItemClass={styles.MenuListItem}
            linkClass={styles.MenuLink}
          />
        </nav>
      </div>
    );
  }
}

export default Navigation;
