import React, { Component } from 'react';
import Downshift from 'downshift';

import styles from './DropDown.css';

class DropDown extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.watchedValue !== this.props.watchedValue) {
      this.ds.clearSelection();
    }
  }

  render() {
    const { items, activeItem, itemToString, ...rest } = this.props;
    const { value } = rest;
    return (
      <Downshift
        ref={(ds) => (this.ds = ds)}
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
}

export default DropDown;
