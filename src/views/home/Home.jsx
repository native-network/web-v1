import React, { Component } from 'react';
import Loader from '../../components/shared/loader';
import CardList from '../../components/shared/card-list';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTribes } from '../../actions/allTribesActions';

export class Home extends Component {
  componentDidMount() {
    this.props.getTribes();
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
