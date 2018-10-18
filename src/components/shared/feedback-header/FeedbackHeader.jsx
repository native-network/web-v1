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
              Ask us anything in our
              <a
                className={styles.FeedbackLink}
                href="https://telegram.me/nativeproject"
                target="_blank"
              >
                Telegram
              </a>
              channel, or send us your bug reports and general feedback at our
              <a
                className={styles.FeedbackLink__zen}
                href="https://nativeproject.zendesk.com/hc/en-us/requests/new"
                target="_blank"
              >
                Zendesk
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
