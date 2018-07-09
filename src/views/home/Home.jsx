import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getTribes } from '../../actions/tribesActions';

import './Home.css';

export class Home extends Component {
  componentDidMount() {
    this.props.getTribes();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Hello World</h1>
        </header>
        <ul>
          {this.props.tribes &&
            this.props.tribes.map(tribe => {
              return <li key={tribe.name}>
                <pre>{JSON.stringify(tribe)}</pre>
                {tribe.name}
                </li>
            })
          }
        </ul>
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
    return { tribes: state.tribes.tribes };
  },
  mapDispatchToProps
)(Home);
