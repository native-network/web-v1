import React from 'react';
import { Form, Field } from 'react-final-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import Button from '../../shared/button';
import FileUploader from '../../shared/file-uploader/FileUploader';

import {
  composeValidators,
  required,
  validateAddress,
  minCharLength,
} from '../utils/validators';

import styles from './ManageProjectForm.css';

export default function ManageProjectForm({ submitForm, project }) {
  const renderError = (error) => <span className={styles.Error}>{error}</span>;

  const minimumCharacters = minCharLength(3);

  return (
    <Form
      onSubmit={(values) => submitForm(values)}
      initialValues={project}
      render={({ handleSubmit, pristine, invalid }) => (
        <form className={styles.ManageProjectForm} onSubmit={handleSubmit}>
          <div className={styles.ManageProjectFields}>
            <Field name="title" validate={minimumCharacters}>
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Project Title*</label>
                  <input {...input} type="text" placeholder="Project Title" />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <Field name="subtitle" validate={minimumCharacters}>
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Project Subtitle*</label>
                  <input
                    {...input}
                    type="text"
                    placeholder="Project Subtitle"
                  />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <Field name="description" validate={required}>
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Project Description*</label>
                  <textarea
                    rows="6"
                    {...input}
                    placeholder="Project Description"
                  />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <Field name="totalCost" validate={required}>
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Total Cost (NTV)*</label>
                  <input
                    {...input}
                    type="number"
                    placeholder="Total Cost (NT)"
                  />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <Field
              name="address"
              validate={composeValidators(required, validateAddress)}
            >
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Funds Release Address*</label>
                  <input {...input} type="text" placeholder="Address" />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <Field name="endDate" validate={required}>
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>End date*</label>
                  <DatePicker
                    {...input}
                    minDate={moment().add(1, 'days')}
                    selected={
                      input.value ? moment(input.value, 'MM/DD/YYYY') : null
                    }
                    onChange={(date) =>
                      input.onChange(moment(date).format('MM/DD/YYYY'))
                    }
                  />
                  {meta.error && meta.touched && renderError(meta.error)}
                  <p>
                    Project voting will open {moment().format('MM/DD/YYYY')}
                  </p>
                </div>
              )}
            </Field>
            <Field name="costBreakdownUrl" type="file">
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Cost Breakdown*</label>
                  <FileUploader
                    {...input}
                    onChange={(file) => {
                      input.onChange(file.fileKey);
                    }}
                  />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <Field name="roadmapUrl" type="file">
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Roadmap*</label>
                  <FileUploader
                    {...input}
                    onChange={(file) => {
                      input.onChange(file.fileKey);
                    }}
                  />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <Field name="imageUrl" type="file">
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Project Image</label>
                  <FileUploader
                    {...input}
                    onChange={(file) => {
                      input.onChange(file.fileKey);
                    }}
                  />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <Field name="additionalInfo">
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Additonal Info</label>
                  <textarea rows="6" {...input} placeholder="Additonal Info" />
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
