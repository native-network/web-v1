/* eslint-disablew */
import React, { Component } from 'react';

import Filter from '../filter';

import TabNavigation from './TabNavigation';
import TabPanel from './TabPanel';
import styles from './TabPanels.css';

class TabPanels extends Component {
  state = {
    activeTab: {},
  };

  componentDidMount() {
    const { panels } = this.props;

    this.setState({ activeTab: panels[0] });
  }

  setActiveTab(panelName) {
    const { panels } = this.props;
    const activeTab = panels.find((panel) => panel.name === panelName);
    this.setState({ activeTab });
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

    // const activeFilters = panels[activeTab].filters;

    return (
      <div className={styles.TabPanels}>
        <TabNavigation
          telegramLink={community && community.telegramLink}
          activeTab={activeTab}
          panels={panelNames}
          clickHandler={(panel) => this.setActiveTab(panel)}
          renderFilter={() =>
            this.props.hasFilter && filters.length ? (
              <Filter filters={!!filters && filters.length ? filters : []} />
            ) : null
          }
        />
        <TabPanel render={() => render && render(items)} />
        )}
      </div>
    );
  }
}

export default TabPanels;
