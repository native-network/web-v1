import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getTribes } from '../../actions/allTribesActions';
import { getUserAccount } from '../../actions/userActions';

import Loader from '../../components/shared/loader';
import CardList from '../../components/shared/card-list';

import './Home.css';

export class Home extends Component {
  componentDidMount() {
    if (this.props.tribes && !this.props.tribes.length) {
      this.props.getTribes();
    }
    if (this.props.user && !this.props.user.length) {
      this.props.getUserAccount();
    }
  }

  render() {
    const { isLoading, user } = this.props;
    return isLoading ? <Loader /> : (
      <main>
        <CardList listItems={this.props.tribes} />
      </main>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getTribes: bindActionCreators(getTribes, dispatch),
    getUserAccount: () => dispatch(getUserAccount())
  };
}

export default connect(
  (state) => {
    return { tribes: state.tribes.tribes, isLoading: state.loading > 0, user: state.user };
  },
  mapDispatchToProps
)(Home);
