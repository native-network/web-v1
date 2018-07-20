import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTribeById, clearActiveTribe } from '../../actions/tribeActions';

import Loader from '../../components/shared/loader';
import Card from '../../components/shared/card';
import TabPanels from '../../components/shared/tab-panels';

const panels = [
  {
    name: 'Votes',
    render: () => <span style={{background: '#bada55'}}>Votes</span>
  },
  {
    name: 'Tasks',
    render: () => <span style={{background: '#bada55'}}>Tasks</span>
  },
  {
    name: 'Projects',
    render: () => <span style={{background: '#bada55'}}>Projects</span>
  }
];

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
          return (
            <TabPanels
                panels={panels}
            />);
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
