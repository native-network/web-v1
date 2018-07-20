import React, { Component } from 'react';
import { connect } from 'react-redux';

import metamask from '../../assets/img/metamask.svg';

export class Tokens extends Component {
  render() {
    return (
      <div className="container">
        <div style={{
          display: 'flex',
          width: '300px',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <img style={{width: '3rem', marginRight: '10px'}} src={metamask} alt=""/>
          Metamask ID: <br />
          weofnawpekmfwoiehr0298h3e
        </div>

      </div>
    );
  }
}

export default connect(
  null,
  null
)(Tokens);
