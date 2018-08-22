import React, { Component } from 'react';
import Loader from '../../components/shared/loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTribeById, clearActiveTribe } from '../../actions/tribeActions';
import { getTribePolls } from '../../actions/tribePollsActions';
import { getTribeProjects } from '../../actions/tribeProjectsActions';
import { getTribeTasks } from '../../actions/tribeTasksActions';

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
    activeTab: 1,
  };

  componentDidMount() {
    this.props.getTribeById(this.props.id);
    this.props.getTribePolls(this.props.id);
    this.props.getTribeProjects(this.props.id);
    this.props.getTribeTasks(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      initiatives: initiatives.map((initiative) => {
        return {
          ...initiative,
          items: nextProps[initiative.name.toLowerCase()],
        };
      }),
    });
  }

  render() {
    const { props, state } = this;

    return props.isLoading ? (
      <Loader />
    ) : (
      <main>
        <h2>Manage Your Community</h2>
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
    getTribeProjects: bindActionCreators(getTribeProjects, dispatch),
    getTribeTasks: bindActionCreators(getTribeTasks, dispatch),
  };
}

export default connect(
  (state, ownProps) => {
    const { loading, activeTribe } = state;
    const { tribe } = activeTribe;
    const { polls } = state.polls;
    const { projects } = state.projects;
    const { tasks } = state.tasks;
    const { tribeId: id } = ownProps.match.params;

    return { tribe, id, isLoading: loading > 0, polls, projects, tasks };
  },
  mapDispatchToProps,
)(TribeAdmin);
