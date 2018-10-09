import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import SVG from 'react-inlinesvg';
import MessageList from '../message-list';
import NotificationsBadge from '../notifications-badge';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

import styles from './Notifications.css';

import alarm from '../../../assets/img/alarm.svg';
const ANIMATION_DURATION = 200;

class Notifications extends Component {
  constructor() {
    super();

    this.messageList = React.createRef();

    this.state = {
      isNotificationsOpen: false,
      listHeight: 0,
    };
  }

  componentDidMount() {
    if (this.messageList.current) {
      this.calculateListHeight(this.messageList.current);
    }

    window.addEventListener('resize', () =>
      this.calculateListHeight(this.messageList.current),
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize');
  }

  calculateListHeight(list) {
    if (list && list.offsetHeight !== this.state.listHeight) {
      this.setState({ listHeight: list && list.offsetHeight });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { location: oldLocation } = prevProps;
    const { location: newLocation } = this.props;

    if (prevState !== this.state) {
      this.calculateListHeight(this.messageList.current);
    }

    if (oldLocation !== newLocation) {
      this.setState({ isNotificationsOpen: false });
    }
  }

  toggleNotifications() {
    this.setState({ isNotificationsOpen: !this.state.isNotificationsOpen });
  }

  render() {
    const notificationsClass = cx({
      NotificationsMenuItem: true,
      Active: this.state.isNotificationsOpen,
    });

    const transition = `all ${ANIMATION_DURATION}ms linear`;

    const transitionStyles = {
      exited: {
        height: '0px',
        visibility: 'hidden',
      },
      exiting: {
        height: '0px',
        transition,
      },
      entering: {
        height: `${this.state.listHeight}px`,
        transition,
      },
      entered: {
        height: `${this.state.listHeight}px`,
      },
    };

    return (
      <div className={styles.NotificationContainer}>
        <button
          className={notificationsClass}
          onClick={() => this.toggleNotifications()}
          aria-haspopup="true"
          aria-expanded={this.state.isNotificationsOpen}
          aria-label="Toggle the notifications menu"
        >
          <SVG className={styles.Alarm} src={alarm} />
          <NotificationsBadge />
        </button>
        <Transition
          in={this.state.isNotificationsOpen}
          timeout={ANIMATION_DURATION}
        >
          {(state) => (
            <div
              className={styles.Notifications}
              style={{
                ...transitionStyles[state],
              }}
            >
              <MessageList
                forwardRef={this.messageList}
                messages={this.props.messages}
              />
            </div>
          )}
        </Transition>
      </div>
    );
  }
}

export default Notifications;
