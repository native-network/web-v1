import React from 'react';
import Downshift from 'downshift';

import Icon from '../icon';

import styles from './CurrencySelector.css';

function CurrencySelector({
  input,
  currency,
  changeHandler,
  currencies,
  isFrom,
}) {
  const filteredCurrencies = currencies.filter((c) => c !== input.value);
  const hasDropdown = filteredCurrencies.length >= 1;
  return (
    <Downshift
      {...input}
      itemToString={(item) => (item ? item.symbol : '')}
      onSelect={(select) => changeHandler(select, isFrom)}
      defaultSelectedItem={currency}
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
            htmlFor={`${isFrom ? 'send' : 'receive'}Dropdown`}
            {...getLabelProps({
              className: styles.MenuLabel,
            })}
          >
            <img
              className={styles.CurrencyIcon}
              src={currency.iconUrl}
              alt=""
            />
            <span className={styles.CurrencyDirection}>
              {isFrom ? `Pay with` : `Receive`}
            </span>
            <span className={styles.CurrencyId}>{currency.symbol}</span>
            {hasDropdown ? (
              <button
                {...getToggleButtonProps({
                  className: styles.MenuToggle,
                })}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={isOpen}
              >
                {isOpen ? <Icon icon="caret-up" /> : <Icon icon="caret-down" />}
              </button>
            ) : null}
          </label>
          {isOpen && hasDropdown ? (
            <ul
              {...getMenuProps({
                className: styles.Dropdown,
              })}
            >
              {filteredCurrencies.map((item, index) => (
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
