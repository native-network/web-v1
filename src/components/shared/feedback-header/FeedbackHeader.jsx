import React from 'react';

import styles from './FeedbackHeader.css';

function FeedbackHeader() {
  return (
    <div className={styles.FeedbackHeader__container}>
      <div className={styles.FeedbackHeader}>
        <span className={styles.Feedback__tag}>ALPHA</span>
        <div className={styles.Feedback__message}>
          <p>
            <strong>Native is currently in Alpha.</strong> We want your feedback
            so we can give you the best user experience possible.&nbsp;
            <span>
              Ask us anything in our&nbsp;
              <a href="https://chat.nativeproject.one" target="_blank">
                Chat
              </a>
              , or send us your bug reports and general feedback on our&nbsp;
              <a href="https://forum.nativeproject.one" target="_blank">
                Forum
              </a>
              .
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FeedbackHeader;
