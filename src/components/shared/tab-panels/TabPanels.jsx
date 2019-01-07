import React, { Component } from 'react';

import Filter from '../filter';

import TabNavigation from './TabNavigation';
import TabPanel from './TabPanel';
import styles from './TabPanels.css';

class TabPanels extends Component {
  state = {
    activeTab: {},
    activeFilter: {},
  };

  componentDidMount() {
    const { panels } = this.props;

    if (this.props.hasFilter) {
      this.setState({ activeTab: panels[0] }, () =>
        this.setState({ activeFilter: this.state.activeTab.filters[0] }),
      );
    } else {
      this.setState({ activeTab: panels[0] });
    }
  }

  setActiveTab(panelName) {
    const { panels } = this.props;
    const activeTab = panels.find((panel) => panel.name === panelName);
    if (this.props.hasFilter) {
      this.setState({ activeTab }, () =>
        this.setState({ activeFilter: activeTab.filters[0] }),
      );
    } else {
      this.setState({ activeTab });
    }
  }

  filterHandler(filter) {
    this.setState({ activeFilter: filter });
  }

  render() {
    const { props, state } = this;
    const { panels, community } = props;
    const { activeTab } = state;
    const { render, items, filters } = activeTab;
    const panelNames = panels.map((panel) => panel.name);

    const activeItems =
      !!this.props.hasFilter && this.state.activeFilter.filter
        ? this.state.activeFilter.filter(items)
        : items;

    return (
      <div className={styles.TabPanels}>
        <TabNavigation
          telegramLink={community && community.telegramLink}
          activeTab={activeTab}
          panels={panelNames}
          clickHandler={(panel) => this.setActiveTab(panel)}
          renderFilter={() => {
            return this.props.hasFilter && filters && filters.length ? (
              <Filter
                activeFilter={this.state.activeFilter || filters[0]}
                selectHandler={(filter) => this.filterHandler(filter)}
                filters={!!filters && filters.length ? filters : []}
              />
            ) : null;
          }}
        />
        <TabPanel render={() => render && render(activeItems)} />
        )}
      </div>
    );
  }
}

export default TabPanels;
