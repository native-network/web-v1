import React from 'react';

import styles from '../WelcomeDialog.css';

export default function StepOne() {
  return (
    <div>
      <p>
        Native is a platform for communities to realize their inherent value
        through their own local currency and set of governance tools. Native
        tokens are used to support communities you care about by converting them
        into a community’s token and joining that community.
      </p>
      <p className={styles.Important}>Joining a community allows you to:</p>
      <ul className={styles.FeatureList}>
        <li>- Vote on issues that are important to you</li>
        <li>- Decide and support which projects will be funded</li>
        <li>- Earn tokens by completing tasks for the community</li>
      </ul>
    </div>
  );
}
