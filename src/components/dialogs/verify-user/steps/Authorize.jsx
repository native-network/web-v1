import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { promptAuthorize } from '../../../../actions/userSessionActions';

import Button from '../../../shared/button';
import native from '../../../../assets/img/native.svg';

function Authorize(props) {
  const { user, submitHandler, promptAuthorize } = props;
  const handleStep = (address) => {
    promptAuthorize(address);
    submitHandler();
  };

  return user.wallet.address.length === 0 ? (
    <div className={'foo'}>
      <div className={''}>
        <img src={native} alt="" />
        <h1>Connect Your Wallet to Continue</h1>
      </div>
      <p>
        If you haven't set up MetaMask (or another Web3 wallet) yet, please{' '}
        <a href="https://metamask.io" target="_blank" rel="noopener noreferrer">
          download and set up MetaMask
        </a>
        .
      </p>
    </div>
  ) : (
    <div className={''}>
      <img src={native} alt="" />
      <h1>Connect Your Wallet to Continue</h1>
      <Button
        centered
        theme="primary"
        content="Sign Message"
        className={'foo'}
        clickHandler={() => handleStep(user.wallet.address)}
      />
    </div>
  );
}

export const mapDispatchToProps = (dispatch) => {
  return {
    promptAuthorize: bindActionCreators(promptAuthorize, dispatch),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(Authorize);
