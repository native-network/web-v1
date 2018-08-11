import React, { Component } from 'react';
import classNames from 'classnames/bind';

import Hamburger from './Hamburger';
import MenuItem from './MenuItem';

import styles from './Navigation.css';

const cx = classNames.bind(styles);

class Navigation extends Component {
  state = {
    isMenuActive: false,
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
      Menu: true,
      MenuOpen: this.state.isMenuActive,
    });

    return (
      <div className={styles.Navigation}>
        <nav>
          <Hamburger
            active={this.state.isMenuActive}
            clickHandler={this.toggleMenu.bind(this)}
          />
          <ul aria-hidden={!this.state.isMenuActive} className={classes}>
            <MenuItem path="/" label="All Tribes" exact />
            {address && <MenuItem path="/dashboard" label="Dashboard" exact />}
            <MenuItem path="/learn" label="Learn" exact />
            {role === 'curator' && (
              <MenuItem path="/manage" label="Manage" exact />
            )}
          </ul>
        </nav>
      </div>
    );
  }
}

export default Navigation;
