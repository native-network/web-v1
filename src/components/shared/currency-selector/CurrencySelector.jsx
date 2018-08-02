import React, { Fragment } from 'react';
import Downshift from 'downshift';

import styles from './CurrencySelector.css';

function CurrencySelector({
  defaultCurrency,
  currencies,
  selectHandler,
  isFrom,
}) {
  return (
    <Downshift
      itemToString={(item) => (item ? item.id : '')}
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
        <div>
          <label
            {...getLabelProps({
              className: styles.MenuLabel,
            })}
          >
            <img src={defaultCurrency.thumb} alt="" />
            <div>
              <span>{isFrom ? `Pay with` : `Receive`}</span>
              {defaultCurrency.id}
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
            </div>
          </label>
          {isOpen ? (
            <ul
              {...getMenuProps({
                className: styles.Dropdown,
              })}
            >
              {currencies
                .filter((item) => item.id !== defaultCurrency.id)
                .map((item, index) => (
                  <li
                    key={item.id}
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
                    <img src={item.thumb} alt="" />
                    {item.id}
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
