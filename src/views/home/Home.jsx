import React, { Component } from 'react';
import Loader from '../../components/shared/loader';
import CardList from '../../components/shared/card-list';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTribes } from '../../actions/allTribesActions';

import './Home.css';

export class Home extends Component {
  componentDidMount() {
    if (this.props.tribes && !this.props.tribes.length) {
      this.props.getTribes();
    }
  }

  render() {
    const { isLoading } = this.props;
    return isLoading ? (
      <Loader />
    ) : (
      <main>
        <CardList listItems={this.props.tribes} />
      </main>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getTribes: bindActionCreators(getTribes, dispatch),
  };
}

export default connect(
  (state) => {
    return { tribes: state.tribes.tribes, isLoading: state.loading > 0 };
  },
  mapDispatchToProps,
)(Home);
