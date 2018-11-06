/*eslint-disable */

import React, { Component, Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from '../../../../shared/modal';
import Button from '../../../../shared/button';
import styles from './PreApproveUserModal.css';

import { preApprovedUser } from '../../../../../actions/communitiesActions';

class PreApproveUserModal extends Component {
  validateEthereumAddress = (address) => {
    return !/^(0x)?[0-9a-f]{40}$/i.test(address)
      ? undefined
      : 'Please enter valid ethereum adreess';
  };

  render() {
    const { closeModal, isOpen, communityId, preApprovedUser } = this.props;
    return (
      <Modal
        hasCloseButton
        closeModal={closeModal}
        isOpen={isOpen}
        renderHeader={() => <h1>Pre Approve Membership</h1>}
        label="Pre Approve User"
      >
        <Form
          onSubmit={({ walletAddress }) => {
            preApprovedUser({
              walletAddress,
              communityId,
            });
            closeModal();
          }}
        >
          {({ handleSubmit, pristine, invalid }) => (
            <form className={styles.form} onSubmit={handleSubmit}>
              <Field name="email" validate={this.validateEthereumAddress}>
                {({ input, meta }) => (
                  <Fragment>
                    <label className={styles.label}>
                      Please Enter the users Ethereum Address
                    </label>
                    <input type="text" {...input} />
                    {meta.error && meta.touched && renderError(meta.error)}
                  </Fragment>
                )}
              </Field>

              <div className={styles.buttonContainer}>
                <Button
                  theme="secondary"
                  content="Approve Address"
                  type="submit"
                  disabled={pristine || invalid}
                />
                <Button
                  theme="link"
                  content="Cancel"
                  type="button"
                  clickHandler={closeModal}
                />
              </div>
            </form>
          )}
        </Form>
      </Modal>
    );
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    preApprovedUser: bindActionCreators(preApprovedUser, dispatch),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(PreApproveUserModal);
