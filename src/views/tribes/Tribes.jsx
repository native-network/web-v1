import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getTribes } from '../../actions/allTribesActions';

import CardList from '../../components/shared/card-list/CardList';

export class Tribes extends Component {

  componentDidMount() {
    if (!this.props.tribes.length) {
      this.props.getTribes();
    }
  }

  render() {
    const { tribes } = this.props;
    return <CardList listItems={tribes} />;
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getTribes: bindActionCreators(getTribes, dispatch)
  };
}

export default connect(
  (state) => {
    const { tribes } = state.tribes;

    return {
      tribes
    };
  },
  mapDispatchToProps
)(Tribes);
