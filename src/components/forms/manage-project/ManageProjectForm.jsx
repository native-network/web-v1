import React from 'react';
import { Form, Field } from 'react-final-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import Button from '../../shared/button';

import styles from './ManageProjectForm.css';

export default function ManageProjectForm({ submitForm, project }) {
  const renderError = (error) => <span className={styles.Error}>{error}</span>;
  const required = (value) => (value ? undefined : 'Required');

  return (
    <Form
      onSubmit={(values) => submitForm(values)}
      initialValues={project}
      render={({ handleSubmit, pristine, invalid }) => (
        <form className={styles.ManageProjectForm} onSubmit={handleSubmit}>
          {!project ? (
            <div className={styles.ManageProjectFields}>
              <Field name="title" validate={required}>
                {({ input, meta }) => (
                  <div className={styles.FieldGroup}>
                    <label>Project Title</label>
                    <input {...input} type="text" placeholder="Project Title" />
                    {meta.error && meta.touched && renderError(meta.error)}
                  </div>
                )}
              </Field>
              <Field name="subtitle" validate={required}>
                {({ input, meta }) => (
                  <div className={styles.FieldGroup}>
                    <label>Project Subtitle</label>
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
                    <label>Project Description</label>
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
                    <label>Total Cost (NT)</label>
                    <input
                      {...input}
                      type="number"
                      placeholder="Total Cost (NT)"
                    />
                    {meta.error && meta.touched && renderError(meta.error)}
                  </div>
                )}
              </Field>
              <Field name="address" validate={required}>
                {({ input, meta }) => (
                  <div className={styles.FieldGroup}>
                    <label>Funds Release Address</label>
                    <input {...input} type="text" placeholder="Address" />
                    {meta.error && meta.touched && renderError(meta.error)}
                  </div>
                )}
              </Field>
              <Field name="endDate" validate={required}>
                {({ input, meta }) => (
                  <div className={styles.FieldGroup}>
                    <p>
                      Project voting will open {moment().format('MM/DD/YYYY')}
                    </p>
                    <label>End date</label>
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
                  </div>
                )}
              </Field>
            </div>
          ) : (
            <div className={styles.ManageProjectFields}>
              <div className={styles.FieldGroup}>
                <label>Project Title</label>
                <p>{project.title}</p>
              </div>
              <div className={styles.FieldGroup}>
                <label>Project Subtitle</label>
                <p>{project.subtitle}</p>
              </div>
              <div className={styles.FieldGroup}>
                <label>Project Description</label>
                <p>{project.description}</p>
              </div>
              <div className={styles.FieldGroup}>
                <label>Total Cost (NT)</label>
                <p>{project.totalCost}</p>
              </div>
              <div className={styles.FieldGroup}>
                <label>Funds Release Address</label>
                <p>{project.address}</p>
              </div>
              <div className={styles.FieldGroup}>
                <label>End Date</label>
                <p>{project.endDate}</p>
              </div>
            </div>
          )}

          <div className={styles.ManageProjectFields}>
            <Field name="costBreakdownUrl" validate={required}>
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Cost Breakdown</label>
                  <input {...input} type="text" placeholder="Url" />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <Field name="roadmapUrl" validate={required}>
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Roadmap</label>
                  <input {...input} type="text" placeholder="Url" />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <Field name="imageUrl" validate={required}>
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Project Image (Optional)</label>
                  <input {...input} type="text" placeholder="Url" />
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
