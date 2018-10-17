import React from 'react';
import { Form, Field } from 'react-final-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateUser } from '../../../actions/userSessionActions';
import Button from '../../../components/shared/button';

import styles from './EditProfile.css';

function EditProfile({ user, updateUser }) {
  return (
    <Form
      initialValues={{
        address: user.address,
        alias: user.alias,
        country: user.country,
        state: user.state,
        city: user.city,
        email: user.email,
        telegram: user.telegram,
        preferredContact: user.preferredContact,
      }}
      onSubmit={(values) => updateUser(user, values)}
    >
      {({ handleSubmit, values }) => (
        <form className={styles.EditProfile} onSubmit={handleSubmit}>
          <Field name="address">
            {({ input }) => (
              <div className={styles.FieldGroup}>
                <label>Address</label>
                <input disabled readOnly type="text" {...input} />
              </div>
            )}
          </Field>
          <Field name="alias">
            {({ input }) => (
              <div className={styles.FieldGroup}>
                <label>Alias</label>
                <input type="text" {...input} />
              </div>
            )}
          </Field>
          <Field name="country">
            {({ input }) => (
              <div className={styles.FieldGroup}>
                <label>Country</label>
                <input type="text" {...input} />
              </div>
            )}
          </Field>
          <Field name="state">
            {({ input }) => (
              <div className={styles.FieldGroup}>
                <label>State/Province</label>
                <input type="text" {...input} />
              </div>
            )}
          </Field>
          <Field name="city">
            {({ input }) => (
              <div className={styles.FieldGroup}>
                <label>City</label>
                <input type="text" {...input} />
              </div>
            )}
          </Field>
          <div className={styles.FieldGroup}>
            <label>Preferred Contact Method:</label>
            <ul className={styles.RadioList}>
              <li>
                <Field
                  id="radioEmail"
                  className={styles.RadioInput}
                  name="preferredContact"
                  value="email"
                  type="radio"
                  component="input"
                />
                <label htmlFor="radioEmail" className={styles.RadioLabel}>
                  Email
                </label>
              </li>
              <li>
                <Field
                  id="radioTelegram"
                  className={styles.RadioInput}
                  name="preferredContact"
                  value="telegram"
                  type="radio"
                  component="input"
                />
                <label htmlFor="radioTelegram" className={styles.RadioLabel}>
                  Telegram
                </label>
              </li>
            </ul>
          </div>
          <Field name="email">
            {({ input }) => (
              <div className={styles.FieldGroup}>
                <label>
                  Email
                  {values.preferredContact === 'email' ? `*` : null}
                </label>
                <input
                  type="email"
                  {...input}
                  required={values.preferredContact === 'email'}
                />
              </div>
            )}
          </Field>
          <Field name="telegram">
            {({ input }) => (
              <div className={styles.FieldGroup}>
                <label>
                  Telegram
                  {values.preferredContact === 'telegram' ? `*` : null}
                </label>
                <input
                  type="text"
                  {...input}
                  required={values.preferredContact === 'telegram'}
                />
              </div>
            )}
          </Field>

          <Button
            type="submit"
            theme="secondary"
            centered
            content="Update your profile"
          />
        </form>
      )}
    </Form>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: bindActionCreators(updateUser, dispatch),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(EditProfile);
