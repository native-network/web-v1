import React from 'react';
import { Form, Field } from 'react-final-form';

import styles from './ManageCommunityForm.css';

import Button from '../../shared/button';
// import FilePicker from '../../shared/file-picker/FilePicker';

export default function ManageCommunityForm({ submitForm }) {
  // Render Error
  const renderError = (error) => <span className={styles.Error}>{error}</span>;
  // Validations
  // const required = (value) => (value ? undefined : 'Required');
  const charLength = (value) =>
    value && value.length >= 400 ? `400 Character limit` : undefined;
  const validateName = (value) =>
    value === 'test' ? 'must not be test' : undefined;
  const validateQuorum = (value) =>
    value > 100 ? 'Quorum must not exceed 100%' : undefined;

  return (
    <Form
      onSubmit={(values) => submitForm(values)}
      render={({ handleSubmit, pristine, invalid, values }) => (
        <form className={styles.ManageCommunityForm} onSubmit={handleSubmit}>
          <div className={styles.ManageCommunityFields}>
            <Field name="name" validate={validateName}>
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Community Name</label>
                  <input {...input} type="text" placeholder="Community name" />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <Field name="location">
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Location</label>
                  <input {...input} type="text" placeholder="City, ST" />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <Field name="communityPurpose" validate={charLength}>
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>About</label>
                  <textarea
                    rows="6"
                    {...input}
                    placeholder="About the community..."
                  />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <div className={styles.GroupedFieldGroup}>
              <h2>Governance</h2>
              <Field name="policy">
                {({ input, meta }) => (
                  <div className={styles.FieldGroup}>
                    <label>Voting Policy</label>
                    <input {...input} type="text" />
                    {meta.error && meta.touched && renderError(meta.error)}
                  </div>
                )}
              </Field>
              <Field name="revenueDistribution">
                {({ input, meta }) => (
                  <div className={styles.FieldGroup}>
                    <label>Revenue Distribution</label>
                    <input {...input} type="text" />
                    {meta.error && meta.touched && renderError(meta.error)}
                  </div>
                )}
              </Field>
              <Field name="quorum" validate={validateQuorum}>
                {({ input, meta }) => (
                  <div className={styles.FieldGroup}>
                    <label>Quorum</label>
                    <input {...input} type="number" />
                    {meta.error && meta.touched && renderError(meta.error)}
                  </div>
                )}
              </Field>
            </div>
            <Field name="communityIntro" validate={charLength}>
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Membership Benefits</label>
                  <textarea
                    rows="6"
                    {...input}
                    placeholder="Membership Benefits"
                  />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <Field name="tokenRequirements" validate={validateName}>
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Tokens Required to Join</label>
                  <input {...input} type="number" placeholder="100" />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            {/* <Field name="communityImage" component={FilePicker} type="file" /> */}
          </div>
          <code>{JSON.stringify(values)}</code>
          <Button
            centered
            type="submit"
            theme="secondary"
            disabled={pristine || invalid}
            content="Save"
          />
        </form>
      )}
    />
  );
}
