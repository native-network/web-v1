/* eslint-disable */
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

    this.selectActiveTab(panels[0])
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.activeTab !== this.state.activeTab && !!this.state.activeTab.filters) {
      this.setState({activeFilter: this.state.activeTab.filters[0]})
    }
  }

  setActiveTab(panelName) {
    const { panels } = this.props;
    const activeTab = panels.find((panel) => panel.name === panelName);
    this.selectActiveTab(activeTab);
  }

  selectActiveTab(tab) {
    if (!!tab.filters) {
      this.setState({ activeTab: tab }, () => this.setState({ activeFilter: this.state.activeTab.filters[0] }));
    } else {
      this.setState({ activeTab: tab })
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
    console.log
    // const activeFilters = panels[activeTab].filters;

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
                activeFilter={this.state.activeFilter}
                selectHandler={(filter) => console.log(filter)}
                filters={!!filters && filters.length ? filters : []}
              />
            ) : null
            }
          }
        />
        <TabPanel render={() => render && render(items)} />
        )}
      </div>
    );
  }
}

export default TabPanels;
