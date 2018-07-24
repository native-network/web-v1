import React from 'react';

import styles from './TabPanels.css';

export default function TabPanel({render}) {
  return (
    <div className={styles.TabPanel}>{render()}</div>
  );
}
