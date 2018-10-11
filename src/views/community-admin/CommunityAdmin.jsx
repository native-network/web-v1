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
import Manage from '../manage';

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
    const initiatives = formatInitiatives(polls, tasks, projects, community);

    if (this.props.isLoading) {
      return <Loader />;
    }
    return community ? (
      <main>
        <div className="container">
          <h1>Manage Your Community</h1>
        </div>
        <TabPanels community={community} panels={initiatives} />
      </main>
    ) : null;
  }
}

function formatInitiatives(polls, tasks, projects, community) {
  return [
    {
      name: 'Community Info',
      render: () => <Manage community={community} />,
    },
    {
      name: 'Polls',
      items: polls,
      render: () => <ManagePolls items={polls} communityId={community.id} />,
    },
    {
      name: 'Tasks',
      items: tasks,
      render: (items) => (
        <ManageTasks items={items} communityId={community.id} />
      ),
    },
    {
      name: 'Projects',
      items: projects,
      render: (items) => (
        <ManageProjects items={items} communityId={community.id} />
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
