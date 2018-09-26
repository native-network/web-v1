import React, { Component } from 'react';
import MessageList from '../message-list';

import styles from './Notifications.css';
import { connect } from 'react-redux';

class Notifications extends Component {
  render() {
    const notificationStyles = this.props.active
      ? styles.NotificationsActive
      : styles.Notifications;
    return (
      <div className={notificationStyles}>
        <MessageList messages={this.props.messages} />
      </div>
    );
  }
}

export default connect((state) => {
  const { messages } = state.user;
  return {
    messages,
  };
})(Notifications);
