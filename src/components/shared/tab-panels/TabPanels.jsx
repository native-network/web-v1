import React, { Component } from 'react';
import moment from 'moment';

import Filter from '../filter';

import TabNavigation from './TabNavigation';
import TabPanel from './TabPanel';

class TabPanels extends Component {
  state = {
    activeTab: 0,
  };

  setActiveTab(tabIndex) {
    this.setState({ activeTab: tabIndex });
  }

  filterHandler({ filter }) {
    const { props, state } = this;
    const { activeTab } = state;
    const { panels } = props;
    const activePanel = (panels || []).find((panel, i) => i === activeTab);
    const items = activePanel.items;

    console.log(filter(items)); // eslint-disable-line
  }

  render() {
    const { props, state } = this;
    const { panels } = props;
    const { activeTab } = state;
    const activePanel = (panels || []).find((panel, i) => i === activeTab);
    const activeItems = activePanel.items;
    const panelNames = panels.map(
      (panel) => `${panel.name} (${(panel.items && panel.items.length) || 0})`,
    );

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

    return (
      <div>
        <TabNavigation
          activeTab={activeTab}
          panels={panelNames}
          clickHandler={(i) => this.setActiveTab(i)}
          renderFilter={() => (
            <Filter
              selectHandler={this.filterHandler.bind(this)}
              className="visible-md"
              items={itemsForFilter}
            />
          )}
        />
        <TabPanel render={() => activePanel.render(activeItems)} />
      </div>
    );
  }
}

export default TabPanels;
