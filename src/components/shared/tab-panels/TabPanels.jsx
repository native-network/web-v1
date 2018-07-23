import React, { Component } from 'react';

import TabNavigation from './TabNavigation';
import TabPanel from './TabPanel';

class TabPanels extends Component {

  state = {
    activeTab: 0
  }

  setActiveTab (tabIndex) {
    this.setState({activeTab: tabIndex});
  }

  render() {
    const { props, state } = this;
    const { panels } = props;
    const { activeTab } = state;
    const activePanel = (panels || []).find((panel, i) => i === activeTab);

    return (
      <div>
        <TabNavigation
            activeTab={activeTab}
            panels={panels}
            clickHandler={(i) => this.setActiveTab(i)}
        />
        <TabPanel render={activePanel.render} />
      </div>
    );
  }
}

export default TabPanels;
