import React from 'react';
import classNames from 'classnames/bind';

import styles from './TabPanels.css';

const cx = classNames.bind(styles);

export default function TabNavigation({ panels, activeTab, clickHandler }) {
  const addClassNames = (index) => {
    return cx({
      ActiveTab: activeTab === index,
      TabNavigationItem: true,
    });
  };

  return (
    <div className={styles.TabNavigation}>
      <div className={styles.TabNavigationContainer}>
        <ul className={styles.TabNavigationList}>
          {(panels || []).map((name, i) => {
            return (
              <li key={i} className={addClassNames(i)}>
                <button onClick={() => clickHandler(i)}>{name}</button>
              </li>
            );
          })}
        </ul>
        <span className={styles.CommunityCTA}>
          Talk with Community members on Telegram
        </span>
      </div>
    </div>
  );
}
