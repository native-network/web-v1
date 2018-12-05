import React from 'react';
import { Form, Field } from 'react-final-form';

import styles from './ClaimTaskForm.css';
import Button from '../../shared/button';

export default function ClaimTaskForm({ user, handleSubmit }) {
  const required = (value) => (value && value.length ? undefined : 'Required');
  const renderError = (error) => <span className={styles.Error}>{error}</span>;

  return (
    <Form
      initialValues={{
        email: user.email || '',
        comments: '',
      }}
      onSubmit={handleSubmit}
      render={({ handleSubmit, invalid, pristine }) => (
        <form className={styles.Form} onSubmit={handleSubmit}>
          <Field validate={required} name="email">
            {({ input, meta }) => (
              <div className={styles.FieldGroup}>
                <label>Email*</label>
                <input {...input} type="email" placeholder="you@example.com" />

                {meta.error && meta.touched && renderError(meta.error)}
              </div>
            )}
          </Field>
          <Field validate={required} name="comments">
            {({ input, meta }) => (
              <div className={styles.FieldGroup}>
                <label>Comments*</label>
                <textarea {...input} placeholder="Please leave comments here" />

                {meta.error && meta.touched && renderError(meta.error)}
              </div>
            )}
          </Field>
          <Button
            className={styles.SubmitButton}
            centered
            disabled={invalid || pristine}
            type="submit"
            theme="secondary"
            content="Claim"
          />
        </form>
      )}
    />
  );
}
