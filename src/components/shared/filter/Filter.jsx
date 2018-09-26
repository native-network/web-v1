import React from 'react';
import Downshift from 'downshift';

import Icon from '../icon';

function Filter({ items, className, selectHandler }) {
  const defaultItem = items.find((item) => item.name === 'All');
  return (
    <Downshift
      onSelect={(select) => selectHandler(select)}
      itemToString={(item) => (item ? item.name : '')}
      defaultSelectedItem={defaultItem}
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
        <div className={`${className ? className : null}`}>
          <label {...getLabelProps()} htmlFor="">
            Filter by type:
          </label>
          <button
            {...getToggleButtonProps({
              style: {
                color: 'black',
              },
            })}
          >
            {selectedItem.name}
            <Icon icon={isOpen ? 'caret-up' : 'caret-down'} />
          </button>
          {isOpen ? (
            <ul {...getMenuProps()}>
              {(items || []).map((item, index) => (
                <li
                  key={index}
                  {...getItemProps({
                    item,
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
      )}
    </Downshift>
  );
}

export default Filter;
