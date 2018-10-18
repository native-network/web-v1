import React from 'react';
import Downshift from 'downshift';

import styles from './DropDown.css';

function DropDown({ items, activeItem, itemToString, ...rest }) {
  const { value } = rest;
  return (
    <Downshift
      defaultInputValue={itemToString(value)}
      defaultSelectedItem={activeItem}
      itemToString={itemToString}
      onSelect={(select) => rest.onChange(select)}
    >
      {({
        getInputProps,
        inputValue,
        getItemProps,
        highlightedIndex,
        getMenuProps,
        isOpen,
        clearSelection,
      }) => (
        <div className={styles.DropdownContainer}>
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
