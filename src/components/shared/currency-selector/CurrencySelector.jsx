import React, { Fragment } from 'react';
import Downshift from 'downshift';

import styles from './CurrencySelector.css';

function CurrencySelector({
  defaultCurrency,
  currencies,
  selectHandler,
  isFrom,
}) {
  const hasDropdown = currencies.length >= 1;
  return (
    <Downshift
      itemToString={(item) => (item ? item.symbol : '')}
      onChange={(selection) => selectHandler(selection)}
    >
      {({
        getLabelProps,
        getToggleButtonProps,
        getMenuProps,
        getItemProps,
        isOpen,
        highlightedIndex,
      }) => (
        <div className={styles.SelectorContainer}>
          <label
            {...getLabelProps({
              className: `${styles.MenuLabel} ${
                !hasDropdown ? styles.NoDropdown : undefined
              }`,
            })}
          >
            <img
              className={styles.CurrencyIcon}
              src={defaultCurrency && defaultCurrency.iconUrl}
              alt=""
            />
            <span className={styles.CurrencyDirection}>
              {isFrom ? `Pay with` : `Receive`}
            </span>
            <span className={styles.CurrencyId}>
              {defaultCurrency && defaultCurrency.symbol}
            </span>
            {hasDropdown ? (
              <button
                {...getToggleButtonProps({
                  className: styles.MenuToggle,
                })}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <Fragment>&#9652;</Fragment>
                ) : (
                  <Fragment>&#9662;</Fragment>
                )}
              </button>
            ) : null}
          </label>
          {isOpen && hasDropdown ? (
            <ul
              {...getMenuProps({
                className: styles.Dropdown,
              })}
            >
              {currencies.map((item, index) => (
                <li
                  key={item.symbol}
                  {...getItemProps({
                    item,
                    className: styles.SubmenuItem,
                    style: {
                      backgroundColor:
                        highlightedIndex === index
                          ? 'rgba(0, 0, 0, .1)'
                          : 'transparent',
                    },
                  })}
                >
                  <img src={item.iconUrl} alt="" />
                  {item.symbol}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </Downshift>
  );
}

export default CurrencySelector;
