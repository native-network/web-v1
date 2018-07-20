import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTribeById, clearActiveTribe } from '../../actions/tribeActions';

import Loader from '../../components/shared/loader';
import Card from '../../components/shared/card';

import styles from './Tribe.css';

export class Tribe extends Component {

  componentDidMount() {
    this.props.getTribeById(this.props.id);
  }

  componentWillUnmount() {
    this.props.clearActiveTribe();
  }

  render() {
    const { props } = this;
    const { tribe } = props;

    return this.props.isLoading ?
      <Loader /> :
      <Card
        tribe={tribe}
        render={() => {
        return <div>Foo</div>
      }} />;
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getTribeById: bindActionCreators(getTribeById, dispatch),
    clearActiveTribe: bindActionCreators(clearActiveTribe, dispatch)
  };
}

export default connect(
  (state, ownProps) => {
    const { loading, activeTribe } = state;
    const { tribe } = activeTribe;
    const { tribeId: id } = ownProps.match.params;

    return { tribe, id, isLoading: loading > 0 };
  },
  mapDispatchToProps
)(Tribe);
