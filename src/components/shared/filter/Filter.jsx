import React from 'react';
import Downshift from 'downshift';

import Icon from '../icon';

import styles from './Filter.css';

function Filter({ activeFilter, filters, className, selectHandler }) {
  return (
    <Downshift
      onSelect={(select) => selectHandler(select)}
      itemToString={(item) => (item ? item.name : '')}
      defaultSelectedItem={activeFilter || filters[0]}
    >
      {({
        getLabelProps,
        getToggleButtonProps,
        getMenuProps,
        getItemProps,
        isOpen,
        selectedItem,
        highlightedIndex,
      }) => (
        <div className={`${styles.Filter} ${className ? className : null}`}>
          <label
            {...getLabelProps({
              className: styles.Label,
            })}
          >
            Filter by type:
          </label>
          <div className={styles.FilterContainer}>
            <button
              {...getToggleButtonProps({
                className: styles.Toggle,
              })}
            >
              {selectedItem.name}
              <Icon
                className={styles.ToggleIcon}
                icon={isOpen ? 'caret-up' : 'caret-down'}
              />
            </button>
            {isOpen ? (
              <ul
                {...getMenuProps({
                  className: styles.FilterMenu,
                })}
              >
                {(filters || []).map((item, index) => (
                  <li
                    key={index}
                    {...getItemProps({
                      item,
                      className: styles.FilterMenuItem,
                      style: {
                        backgroundColor:
                          highlightedIndex === index
                            ? 'rgba(0, 0, 0, .1)'
                            : 'transparent',
                      },
                    })}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      )}
    </Downshift>
  );
}

export default Filter;
