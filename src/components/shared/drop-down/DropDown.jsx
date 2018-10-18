import React from 'react';
import Downshift from 'downshift';

import styles from './DropDown.css';

function DropDown({ label, items, itemToString, ...rest }) {
  const { input } = rest;
  return (
    <Downshift
      {...input}
      defaultInputValue={
        typeof input.value === 'object'
          ? itemToString(input.value)
          : input.value
      }
      initialInputValue={
        typeof input.value === 'object'
          ? itemToString(input.value)
          : input.value
      }
      itemToString={itemToString}
      onChange={(select) => input.onChange(itemToString(select))}
    >
      {({
        getInputProps,
        getLabelProps,
        inputValue,
        getItemProps,
        highlightedIndex,
        getMenuProps,
        isOpen,
        clearSelection,
      }) => (
        <div className={styles.DropdownContainer}>
          <label {...getLabelProps()}>{label}</label>
          <input
            type="text"
            {...getInputProps({
              onBlur: (e) => {
                if (e.target.value === '') clearSelection();
              },
            })}
          />
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
