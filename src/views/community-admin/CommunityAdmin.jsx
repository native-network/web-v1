import React, { Component } from 'react';
import Loader from '../../components/shared/loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  setActiveCommunity,
  unsetActiveCommunity,
} from '../../actions/communitiesActions';
import { getCommunityPolls } from '../../actions/communityPollsActions';
import { getCommunityProjects } from '../../actions/communityProjectsActions';
import { getCommunityTasks } from '../../actions/communityTasksActions';

import TabPanels from '../../components/shared/tab-panels';
import {
  ManagePolls,
  ManageProjects,
  ManageTasks,
} from '../../components/curators';

export class CommunityAdmin extends Component {
  componentDidMount() {
    const { id } = this.props;
    this.props.setActiveCommunity(id);
    this.props.getCommunityPolls(id);
    this.props.getCommunityProjects(id);
    this.props.getCommunityTasks(id);
  }

  componentWillUnmount() {
    this.props.unsetActiveCommunity();
  }

  render() {
    const { community, polls, tasks, projects } = this.props;
    const initiatives = formatInitiatives(polls, tasks, projects, community.id);

    if (this.props.isLoading) {
      return <Loader />;
    }
    return community ? (
      <main>
        <h2>Manage Your Community</h2>
        <TabPanels community={community} panels={initiatives} />
      </main>
    ) : null;
  }
}

function formatInitiatives(polls, tasks, projects, communityId) {
  return [
    {
      name: 'Votes',
      items: polls,
      render: (items) => (
        <ManagePolls items={items} communityId={communityId} />
      ),
    },
    {
      name: 'Tasks',
      items: tasks,
      render: (items) => (
        <ManageTasks items={items} communityId={communityId} />
      ),
    },
    {
      name: 'Projects',
      items: projects,
      render: (items) => (
        <ManageProjects items={items} communityId={communityId} />
      ),
    },
  ];
}

export function mapDispatchToProps(dispatch) {
  return {
    setActiveCommunity: bindActionCreators(setActiveCommunity, dispatch),
    unsetActiveCommunity: bindActionCreators(unsetActiveCommunity, dispatch),
    getCommunityPolls: bindActionCreators(getCommunityPolls, dispatch),
    getCommunityProjects: bindActionCreators(getCommunityProjects, dispatch),
    getCommunityTasks: bindActionCreators(getCommunityTasks, dispatch),
  };
}

export default connect(
  (state, ownProps) => {
    const { communityId: id } = ownProps.match.params;
    const { loading } = state;
    return {
      id,
      community: state.communities.communities.find((c) => c.id === +id),
      isLoading: loading > 0,
      polls: state.polls.polls,
      tasks: state.tasks.tasks,
      projects: state.projects.projects,
    };
  },
  mapDispatchToProps,
)(CommunityAdmin);
