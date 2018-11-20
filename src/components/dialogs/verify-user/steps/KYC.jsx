import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { updateKyc, getKycToken } from '../../../../actions/userSessionActions';

class KYC extends Component {
  state = {
    scriptLoaded: false,
    iframeInitialized: false,
    timedout: false,
  };

  componentDidMount() {
    const script = document.createElement('script');
    // TODO: add `.env` var
    script.src = 'https://test-api.sumsub.com/idensic/static/idensic.js';
    script.async = true;

    if (this.props.user.id) {
      this.props.getKycToken(this.props.user.id);
    }

    document.body.appendChild(script);
    script.onload = () => this.setState({ scriptLoaded: true });
  }

  componentDidUpdate(prevProps, prevState) {
    const { scriptLoaded: newLoaded } = this.state;
    const { kycToken: newToken } = this.props.user;

    if (prevState.timedout !== this.state.timedout && !this.state.timedout) {
      this.renewToken(newToken);
    }

    if (
      newLoaded &&
      prevProps.kycToken !== newToken &&
      !this.state.iframeInitialized
    ) {
      this.initializeIframe(newToken);
    }
  }

  renewToken() {
    this.setState({ timedout: false }, () =>
      this.props.getKycToken(this.props.user.id),
    );
  }

  initializeIframe(token) {
    const { idensic } = global;
    const { user } = this.props;

    idensic.init(
      `#${this.ifr.id}`,
      {
        accessToken: `${token}`,
        applicantDataPage: {
          enabled: true,
          fields: [
            {
              name: 'firstName',
              required: true,
            },
            {
              name: 'lastName',
              required: true,
            },
            {
              name: 'email',
              required: false,
            },
          ],
        },
        requiredDocuments:
          'IDENTITY:PASSPORT,ID_CARD,DRIVERS;SELFIE:SELFIE;PROOF_OF_RESIDENCE:UTILITY_BILL',
      },
      (messageType, payload) => {
        switch (messageType) {
          case 'idCheck.onApplicantCreated':
            this.props.updateKyc(user.id, payload.applicantId);
            return;
          case 'idCheck.onError':
            if (payload.code === 'session-expired') {
              this.setState({ timedout: true });
            }
            return;
          default:
            return;
        }
      },
    );

    this.setState({ iframeInitialized: true });
  }

  render() {
    return (
      <div style={{ marginTop: '2rem' }} id="foo" ref={(f) => (this.ifr = f)} />
    );
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    updateKyc: bindActionCreators(updateKyc, dispatch),
    getKycToken: bindActionCreators(getKycToken, dispatch),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(KYC);
