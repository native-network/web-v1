import React, { Component } from 'react';
import Loader from '../../components/shared/loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTribeById, clearActiveTribe } from '../../actions/tribeActions';
import { getTribePolls } from '../../actions/tribePollsActions';

import TabPanels from '../../components/shared/tab-panels';
import {
  ManagePolls,
  ManageProjects,
  ManageTasks,
} from '../../components/curators';

const initiatives = [
  {
    name: 'Polls',
    items: [],
    render: (items) => <ManagePolls items={items} />,
  },
  {
    name: 'Tasks',
    items: [],
    render: (items) => <ManageTasks items={items} />,
  },
  {
    name: 'Projects',
    items: [],
    render: (items) => <ManageProjects items={items} />,
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.polls) {
      // this will also assign projects and tasks in the future
      const updatedInitiatives = initiatives.map((initiative) => {
        if (initiative.name === 'Polls') {
          initiative.items = nextProps.polls;
        }
        return initiative;
      });
      this.setState({
        initiatives: updatedInitiatives,
      });
    }
  }

  render() {
    const { props, state } = this;

    return props.isLoading ? (
      <Loader />
    ) : (
      <main>
        <h2>Manage Your Tribe</h2>
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
