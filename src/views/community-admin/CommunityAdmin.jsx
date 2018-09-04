import React, { Component } from 'react';
import Loader from '../../components/shared/loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getCommunityById,
  clearActiveCommunity,
} from '../../actions/communityActions';
import { getCommunityPolls } from '../../actions/communityPollsActions';
import { getCommunityProjects } from '../../actions/communityProjectsActions';
import { getCommunityTasks } from '../../actions/communityTasksActions';

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

export class CommunityAdmin extends Component {
  state = {
    initiatives: initiatives,
    activeTab: 1,
  };

  componentDidMount() {
    this.props.getCommunityById(this.props.id);
    this.props.getCommunityPolls(this.props.id);
    this.props.getCommunityProjects(this.props.id);
    this.props.getCommunityTasks(this.props.id);
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
    getCommunityById: bindActionCreators(getCommunityById, dispatch),
    clearActiveCommunity: bindActionCreators(clearActiveCommunity, dispatch),
    getCommunityPolls: bindActionCreators(getCommunityPolls, dispatch),
    getCommunityProjects: bindActionCreators(getCommunityProjects, dispatch),
    getCommunityTasks: bindActionCreators(getCommunityTasks, dispatch),
  };
}

export default connect(
  (state, ownProps) => {
    const { loading, activeCommunity } = state;
    const { community } = activeCommunity;
    const { polls } = state.polls;
    const { projects } = state.projects;
    const { tasks } = state.tasks;
    const { communityId: id } = ownProps.match.params;

    return { community, id, isLoading: loading > 0, polls, projects, tasks };
  },
  mapDispatchToProps,
)(CommunityAdmin);