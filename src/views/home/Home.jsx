import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getTribes } from '../../actions/allTribesActions';

import Loader from '../../components/shared/loader';
import CardList from '../../components/shared/card-list';

import './Home.css';

export class Home extends Component {
  componentDidMount() {
    if (this.props.tribes && !this.props.tribes.length) {
      this.props.getTribes();
    }
  }

  render() {
    const { isLoading } = this.props;

    return isLoading ? <Loader /> : (
      <div className="container">
        <h1>Welcome to Native</h1>
        <h2>Get started by connecting to a web3 wallet.</h2>
        <CardList listItems={this.props.tribes} />
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    getTribes: bindActionCreators(getTribes, dispatch)
  };
}

export default connect(
  (state) => {
    return { tribes: state.tribes.tribes, isLoading: state.loading > 0 };
  },
  mapDispatchToProps
)(Home);
