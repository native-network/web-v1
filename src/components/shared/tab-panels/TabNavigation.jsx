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
        {renderFilter ? renderFilter() : null}
        {telegramLink && (
          <a
            target="_blank"
            rel="noopener nofollow"
            href={telegramLink}
            className={`${styles.CommunityCTA} visible-md`}
          >
            <Icon className={styles.CTAIcon} icon="telegram" />
            <span>Talk with Community members on Telegram</span>
          </a>
        )}
      </div>
    </div>
  );
}
