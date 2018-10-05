import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import classNames from 'classnames/bind';

import Hamburger from './Hamburger';
import Menu from './Menu';

import styles from './Navigation.css';

const cx = classNames.bind(styles);

const ANIMATION_DURATION = 200;

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.menu = React.createRef();

    this.state = {
      isMenuActive: false,
    };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

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
    const { role, wallet } = this.props.user;
    const { address } = wallet;

    const classes = cx({
      PrimaryMenu: true,
      MenuOpen: this.state.isMenuActive,
    });

    const transition = `all ${ANIMATION_DURATION}ms linear`;

    const transitionStyles = {
      exited: {
        height: '0px',
        visibility: 'hidden',
      },
      entered: {
        height: `${this.menu.current && this.menu.current.offsetHeight}px`,
      },
      entering: {
        height: `${this.menu.current && this.menu.current.offsetHeight}px`,
        transition,
      },
      exiting: {
        height: '0px',
        transition,
      },
    };

    return (
      <div className={styles.Navigation}>
        <nav>
          <Hamburger
            active={this.state.isMenuActive}
            clickHandler={this.toggleMenu}
          />
          <Transition in={this.state.isMenuActive} timeout={ANIMATION_DURATION}>
            {(state) => (
              <div
                className={styles.MenuContainer}
                style={{
                  ...transitionStyles[state],
                }}
              >
                <Menu
                  forwardRef={this.menu}
                  address={address}
                  role={role}
                  hidden={!this.state.isMenuActive}
                  menuClass={classes}
                  menuItemClass={styles.MenuListItem}
                  linkClass={styles.MenuLink}
                />
              </div>
            )}
          </Transition>
        </nav>
      </div>
    );
  }
}

export default Navigation;
