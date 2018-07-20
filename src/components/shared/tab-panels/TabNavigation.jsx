import React from 'react';
import classNames from 'classnames/bind';

import styles from './TabPanels.css';

const cx = classNames.bind(styles);

export default function TabNavigation ({items, activeTab, clickHandler}) {

  const addClassNames = (index) => {
    return cx({
      ActiveTab: activeTab === index,
      TabNavigationItem: true
    });
  };

  return (
    <ul className={styles.TabNavigation}>
      {(items || []).map(({name}, i) => {
        return (
          <li
              key={i}
              className={addClassNames(i)}
              onClick={() => clickHandler(i)}
          >
            <button>{name}</button>
          </li>
        );
      })}
    </ul>
  );
}