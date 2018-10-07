import React, { Component } from 'react';
import Message from '../message';
import styles from './MessageList.css';

const renderListItem = (message, index) => {
  return (
    <li className={styles.MessageListItem} key={index}>
      <Message message={{ ...message }} />
    </li>
  );
};

class MessageList extends Component {
  render() {
    return (
      <ul ref={this.props.forwardRef} className={styles.MessageList}>
        {this.props.messages.length === 0 ? (
          <div className={styles.NoNotifications}>No notifications</div>
        ) : null}
        {(this.props.messages || []).map((message, i) =>
          renderListItem(message, i),
        )}
      </ul>
    );
  }
}

export default MessageList;
