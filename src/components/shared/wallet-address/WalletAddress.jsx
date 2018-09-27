import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastrSuccess, toastrError } from '../../../actions/toastrActions';

import Icon from '../icon';

import styles from './WalletAddress.css';

export class WalletAddress extends Component {
  handleCopy() {
    const { address } = this.props;
    const textArea = document.createElement('textarea');
    textArea.textContent = address;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
      document.execCommand('copy');
      return this.props.toastrSuccess(
        'Your address has been copied to clipboard.',
      );
    } catch (err) {
      this.props.toastrError(
        'There was a problem copying your address to clipboard.',
      );
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  }

  render() {
    const { address } = this.props;
    const len = address.length;
    const trimmedAddress = address.slice(0, len - 3);
    const finalChars = address.slice(len - 3);

    return (
      <div className={styles.AddressContainer}>
        <span className={`${styles.Label}`}>Address:&nbsp;</span>
        <span className={styles.TrimmedAddress}>{trimmedAddress}</span>
        <span className={styles.TrimmedAddressSuffix}>{finalChars}</span>
        <button
          className={styles.CopyLink}
          onClick={this.handleCopy.bind(this)}
        >
          <Icon
            onClick={this.handleCopy.bind(this)}
            className={styles.CopyIcon}
            icon="copy"
          />
        </button>
      </div>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    toastrSuccess: bindActionCreators(toastrSuccess, dispatch),
    toastrError: bindActionCreators(toastrError, dispatch),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(WalletAddress);
