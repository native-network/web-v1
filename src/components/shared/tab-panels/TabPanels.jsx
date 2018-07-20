import React, { Component } from 'react';

import TabNavigation from './TabNavigation';

class TabPanels extends Component {

  state = {
    activeTab: 0
  }

  setActiveTab (tabIndex) {

  }

  render() {
    const { props, state, setActiveTab } = this;
    const { panels } = props;
    const { activeTab } = state;

    console.log(activeTab);
    console.log(panels);

    return (
      <div>
        <TabNavigation items={panels} clickHandler={() => alert('clicked')} />
        {/* {(panels || []).find(({render}, i) => {
          return i === activeTab ? <div key={i}>{render()}</div> : null;
        })} */}
      </div>
    );
  }
}

export default TabPanels;
