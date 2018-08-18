import React from 'react';
import { Form, Field } from 'react-final-form';

import Button from '../../shared/button';

import styles from './ManageProjectForm.css';

export default function ManageProjectForm({ submitForm }) {
  const renderError = (error) => <span className={styles.Error}>{error}</span>;
  const required = (value) => (value ? undefined : 'Required');

  return (
    <Form
      onSubmit={(values) => submitForm(values)}
      render={({ handleSubmit, pristine, invalid }) => (
        <form className={styles.ManageProjectForm} onSubmit={handleSubmit}>
          <div className={styles.ManageProjectFields}>
            <Field name="name" validate={required}>
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Project Name</label>
                  <input {...input} type="text" placeholder="Project Name" />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
          </div>
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
