import React, { Fragment } from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { requestPrivateCommunityAccess } from '../../../actions/communitiesActions';
import styles from './CommunityPrivateUserRequest.css';
import Button from '../../shared/button';

const CommunityPrivateUserRequest = ({
  community,
  user,
  closeModal,
  requestPrivateCommunityAccess,
}) => {
  const { name } = community;
  const { address } = user;

  // Render Error
  const renderError = (error) => <p className={styles.error}>{error}</p>;

  // Validations
  const validateEmail = (value) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(value).toLowerCase()) ? 'Invalid Email' : undefined;
  };

  const validateDescription = (value) => {
    if (value === undefined || value.length <= 0) {
      return 'Must include a description';
    }
    if (value && value.length > 280) {
      return 'Must use less than 280 characters';
    }
    return undefined;
  };

  // character count
  const renderCharacterCount = (value) => {
    if (!value) {
      return '280/0 Characters';
    }
    return '280/' + value.length + ' Characters';
  };

  return (
    <Form
      onSubmit={({ description, email }) => {
        const { id } = community;

        requestPrivateCommunityAccess({
          description,
          email,
          address,
          communityId: id,
        });
        closeModal();
      }}
    >
      {({ handleSubmit, pristine, invalid }) => (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Join {name} Community</h1>

          <Field name="email" validate={validateEmail}>
            {({ input, meta }) => (
              <Fragment>
                <label>Please Enter your email</label>
                <input type="text" {...input} />
                {meta.error && meta.touched && renderError(meta.error)}
              </Fragment>
            )}
          </Field>

          <label>Wallet Address</label>
          <p className={styles.address}>{address}</p>

          <Field name="description" validate={validateDescription}>
            {({ input, meta }) => (
              <div className={styles.descriptionContainer}>
                <p>
                  Please provide a short message describing why you would like
                  to join our community.
                </p>
                <textarea {...input} />
                <span>{renderCharacterCount(input.value)}</span>
                {meta.error && meta.touched && renderError(meta.error)}
              </div>
            )}
          </Field>

          <div className={styles.buttonContainer}>
            <Button
              theme="primary"
              content="Request to Join Community"
              type="submit"
              disabled={pristine || invalid}
            />
            <span onClick={closeModal}>Cancel</span>
          </div>
        </form>
      )}
    </Form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestPrivateCommunityAccess: bindActionCreators(
      requestPrivateCommunityAccess,
      dispatch,
    ),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(CommunityPrivateUserRequest);
