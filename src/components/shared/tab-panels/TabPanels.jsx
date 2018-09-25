import React, { Component } from 'react';

import TabNavigation from './TabNavigation';
import TabPanel from './TabPanel';

class TabPanels extends Component {
  state = {
    activeTab: 0,
  };

  setActiveTab(tabIndex) {
    this.setState({ activeTab: tabIndex });
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

    console.log(activeItems); // eslint-disable-line

    return (
      <div>
        <TabNavigation
          activeTab={activeTab}
          panels={panelNames}
          clickHandler={(i) => this.setActiveTab(i)}
          renderFilter={() => <span>foo</span>}
        />
        <TabPanel render={() => activePanel.render(activeItems)} />
      </div>
    );
  }
}

export default TabPanels;
