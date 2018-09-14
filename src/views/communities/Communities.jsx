import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getCommunities } from '../../actions/communitiesActions';

import CardList from '../../components/shared/card-list/CardList';

export class Communities extends Component {
  componentDidMount() {
    if (!this.props.communities.length) {
      this.props.getCommunities();
    }
  }

  render() {
    const { communities } = this.props;
    return <CardList listItems={communities} />;
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getCommunities: bindActionCreators(getCommunities, dispatch),
  };
}

export default connect(
  (state) => {
    const { communities } = state.communities;

    return {
      communities,
    };
  },
  mapDispatchToProps,
)(Communities);
