import React, { Component } from 'react';
import Loader from '../../components/shared/loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTribeById, clearActiveTribe } from '../../actions/tribeActions';
import { getTribePolls } from '../../actions/tribePollsActions';

import TabPanels from '../../components/shared/tab-panels';
import PollsAdmin from '../../components/admin/polls-admin';

const initiatives = [
  {
    name: 'Polls',
    items: [],
    render: (items) => <PollsAdmin items={items} />,
  },
  {
    name: 'Tasks',
    items: [],
    render: (items) => <PollsAdmin items={items} />,
  },
  {
    name: 'Projects',
    items: [],
    render: (items) => <PollsAdmin items={items} />,
  },
];

export class TribeAdmin extends Component {
  state = {
    initiatives: initiatives,
  };

  componentDidMount() {
    this.props.getTribeById(this.props.id);
    this.props.getTribePolls(this.props.id);
  }

  componentWillReceiveProps() {
    // TODO: Redo this when we get more initiatives
    initiatives[0].items = this.props.polls;
    this.setState({
      initiatives: initiatives,
    });
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
    getTribePolls: bindActionCreators(getTribePolls, dispatch),
  };
}

export default connect(
  (state, ownProps) => {
    const { loading, activeTribe } = state;
    const { tribe } = activeTribe;
    const { polls } = state.polls;
    const { tribeId: id } = ownProps.match.params;

    return { tribe, id, isLoading: loading > 0, polls };
  },
  mapDispatchToProps,
)(TribeAdmin);
