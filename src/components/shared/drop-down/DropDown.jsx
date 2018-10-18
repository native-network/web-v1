/* eslint-disable */
import React from 'react';
import Downshift from 'downshift';

import styles from './DropDown.css';

function DropDown({ label, items, itemToString, itemToStore, ...rest }) {
  const { input } = rest;
  return (
    <Downshift
      {...input}
      initialInputValue={typeof input.value === 'object' ? itemToString(input.value) : input.value}
      itemToString={itemToString}
      onSelect={(select) => input.onChange(itemToStore(select))}
    >
      {({
        getInputProps,
        getLabelProps,
        inputValue,
        getItemProps,
        highlightedIndex,
        getMenuProps,
        isOpen,
      }) => (
        <div className={styles.DropdownContainer}>
          <label {...getLabelProps()}>{label}</label>
          <input type="text" {...getInputProps({
            ...input,
            value: typeof input.value === 'object' ? itemToString(input.value) : input.value
          })} />
          {isOpen ? (
            <ul
              {...getMenuProps({
                className: styles.DropdownMenu,
              })}
            >
              {items
                .filter(
                  (item) =>
                    !inputValue ||
                    itemToString(item)
                      .toLowerCase()
                      .includes(inputValue.toLowerCase()),
                )
                .map((item, i) => (
                  <li
                    key={i}
                    {...getItemProps({
                      item,
                      className: styles.DropdownMenuItem,
                      style: {
                        backgroundColor:
                          highlightedIndex === i
                            ? 'rgba(0, 0, 0, .1)'
                            : 'transparent',
                      },
                    })}
                  >
                    {itemToString(item)}
                  </li>
                ))}
            </ul>
          ) : null}
        </div>
      )}
    </Downshift>
  );
}

export default DropDown;
