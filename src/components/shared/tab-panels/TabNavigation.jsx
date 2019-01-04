import React from 'react';
import classNames from 'classnames/bind';
import Icon from '../icon';

import styles from './TabPanels.css';

const cx = classNames.bind(styles);

export default function TabNavigation({
  telegramLink,
  panels,
  activeTab,
  renderFilter,
  clickHandler,
}) {
  const addClassNames = (name) => {
    return cx({
      ActiveTab: activeTab.name === name,
      TabNavigationItem: true,
    });
  };

  return (
    <div className={styles.TabNavigation}>
      <div className={styles.TabNavigationContainer}>
        <ul className={styles.TabNavigationList}>
          {(panels || []).map((name, i) => {
            return (
              <li key={i} className={addClassNames(name)}>
                <button onClick={() => clickHandler(name)}>{name}</button>
              </li>
            );
          })}
        </ul>
        {renderFilter ? renderFilter() : null}
        {telegramLink && (
          <a
            target="_blank"
            rel="noopener nofollow"
            href={telegramLink}
            className={`${styles.CommunityCTA} visible-md`}
          >
            <Icon className={styles.CTAIcon} icon="telegram" />
            <span>Join Community Telegram</span>
          </a>
        )}
      </div>
    </div>
  );
}
