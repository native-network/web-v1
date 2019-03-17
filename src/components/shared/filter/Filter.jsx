import React, { Component } from 'react';
import Downshift from 'downshift';

import Icon from '../icon';

import styles from './Filter.css';

class Filter extends Component {
  state = {
    filter: this.props.activeFilter,
  };

  componentDidUpdate(prevProps) {
    if (this.props.activeFilter !== prevProps.activeFilter) {
      this.setState({ filter: this.props.activeFilter });
    }
  }

  render() {
    const { filters, className, selectHandler } = this.props;
    const { filter } = this.state;

    return (
      <Downshift
        onChange={(select) => selectHandler(select)}
        onSelect={(select) => selectHandler(select)}
        itemToString={(item) => (item ? item.name : '')}
        initialSelectedItem={filter || filters[0]}
        selectedItem={this.state.filter}
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
}

export default Filter;
