import React, { Component } from 'react';
import Loader from '../../components/shared/loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTribeById, clearActiveTribe } from '../../actions/tribeActions';

import TabPanels from '../../components/shared/tab-panels';
import { VotesAdmin } from '../../components/admin';

const initiatives = [
  {
    name: 'Votes',
    items: [
      {
        name: 'Support First thing',
        description: 'Cast a vote to support something',
      },
      {
        name: 'Support Second Thing',
        description: 'Cast a vote to support something',
      },
      {
        name: 'Support Third thing',
        description: 'Cast a vote to support something',
      },
    ],
    render: (items) => <VotesAdmin items={items} />,
  },
  {
    name: 'Tasks',
    items: [
      {
        name: 'Task 1',
        description: 'Do something',
      },
      {
        name: 'Task 2',
        description: 'Do something',
      },
      {
        name: 'Task 2',
        description: 'Do something',
      },
    ],
    render: (items) => <VotesAdmin items={items} />,
  },
  {
    name: 'Projects',
    items: [
      {
        name: 'Project 1',
        description: 'Do Something else',
      },
      {
        name: 'Project 2',
        description: 'Do Something else',
      },
      {
        name: 'Project 3',
        description: 'Do Something else',
      },
    ],
    render: (items) => <VotesAdmin items={items} />,
  },
];

export class TribeAdmin extends Component {
  state = {
    initiatives: initiatives,
  };

  componentDidMount() {
    this.props.getTribeById(this.props.id);

    console.log(this.props.tribe); // eslint-disable-line
  }

  componentWillUnmount() {
    this.props.clearActiveTribe();
  }

  render() {
    const { props, state } = this;

    return props.isLoading ? (
      <Loader />
    ) : (
      <main>
        <h2>Manage Your Tribe</h2>
        <p>{props.tribe.name}</p>
        <TabPanels panels={state.initiatives} />
      </main>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getTribeById: bindActionCreators(getTribeById, dispatch),
    clearActiveTribe: bindActionCreators(clearActiveTribe, dispatch),
  };
}

export default connect(
  (state, ownProps) => {
    const { loading, activeTribe } = state;
    const { tribe } = activeTribe;
    const { tribeId: id } = ownProps.match.params;

    return { tribe, id, isLoading: loading > 0 };
  },
  mapDispatchToProps,
)(TribeAdmin);
