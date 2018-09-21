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
    <ul className={styles.TabNavigation}>
      {(panels || []).map((name, i) => {
        return (
          <li
            key={i}
            className={addClassNames(i)}
            onClick={() => clickHandler(i)}
          >
            {/* <button>{name}</button> */}
            <button disabled={i > 0}>{name}</button>
          </li>
        );
      })}
    </ul>
  );
}
