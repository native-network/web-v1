import React, { Component } from 'react';
import moment from 'moment';

import Filter from '../filter';

import TabNavigation from './TabNavigation';
import TabPanel from './TabPanel';

const today = moment();

const itemsForFilter = [
  {
    name: 'All',
    filter: (items) => items,
  },
  {
    name: 'Open',
    filter: (items) =>
      (items || []).filter((item) => moment(item.endDate).isAfter(today)),
  },
  {
    name: 'Closed',
    filter: (items) =>
      (items || []).filter((item) => moment(item.endDate).isBefore(today)),
  },
];

class TabPanels extends Component {
  state = {
    activeTab: 0,
    activeFilter: itemsForFilter.find((f) => f.name === 'Open').filter,
  };

  setActiveTab(tabIndex) {
    this.setState({ activeTab: tabIndex });
  }

  filterHandler({ filter }) {
    this.setState({ activeFilter: filter });
  }

  render() {
    const { props, state } = this;
    const { panels } = props;
    const { activeTab } = state;
    const panelNames = panels.map(
      (panel) => `${panel.name} (${(panel.items && panel.items.length) || 0})`,
    );

    return (
      <div>
        <TabNavigation
          activeTab={activeTab}
          panels={panelNames}
          clickHandler={(i) => this.setActiveTab(i)}
          renderFilter={() =>
            this.props.hasFilter ? (
              <Filter
                selectHandler={this.filterHandler.bind(this)}
                className="visible-lg"
                filters={itemsForFilter}
              />
            ) : null
          }
        />
        {(panels || []).map(
          ({ render, items }, index) =>
            index === activeTab ? (
              <TabPanel
                key={index}
                render={() => render(this.state.activeFilter(items))}
              />
            ) : null,
        )}
      </div>
    );
  }
}

export default TabPanels;
