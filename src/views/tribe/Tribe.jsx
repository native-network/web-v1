import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTribeById, clearActiveTribe } from '../../actions/tribeActions';

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

    return (
      <Fragment>
        <img src="http://placehold.it/1200x300" alt=""/>
        <div className={`container ${styles.TribeContainer}`}>
          <h1>{tribe.name}</h1>
          <p>{tribe.tribePurpose}</p>
        </div>
      </Fragment>
    );
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
    const { tribe } = state.activeTribe;
    const { tribeId: id } = ownProps.match.params;

    return { tribe, id };
  },
  mapDispatchToProps
)(Tribe);
