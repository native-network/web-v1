import React from 'react';
import { Form, Field } from 'react-final-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import styles from './ManageTaskForm.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import Button from '../../shared/button';
import FileUploader from '../../shared/file-uploader/FileUploader';

export default function ManageTaskForm({ submitForm }) {
  const renderError = (error) => <span className={styles.Error}>{error}</span>;
  const required = (value) => (value ? undefined : 'Required');
  const validateNumber = (value) =>
    value > 0 ? undefined : 'Must be more than 0';
  const composeValidators = (...validators) => (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined,
    );

  return (
    <Form
      onSubmit={(values) => submitForm(values)}
      initialValues={{
        timeToCompleteUnit: 'days',
      }}
      render={({ handleSubmit, pristine, invalid, values }) => (
        <form className={styles.ManageTaskForm} onSubmit={handleSubmit}>
          <div className={styles.ManageTaskFields}>
            <Field name="title" validate={required}>
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Task Title*</label>
                  <input {...input} type="text" placeholder="Task Title" />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <Field
              name="reward"
              validate={composeValidators(required, validateNumber)}
            >
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Task Reward (NVT)*</label>
                  <input
                    {...input}
                    type="number"
                    placeholder="Task Reward (NVT)"
                  />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>

            <Field name="imageUrl" type="file">
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Vote Image</label>
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

            <Field name="timeToComplete" validate={required}>
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Time to Complete (Days)*</label>
                  <input
                    {...input}
                    type="number"
                    placeholder={`In ${values.timeToCompleteUnit}`}
                  />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>

            <Field name="description" validate={required}>
              {({ input, meta }) => (
                <div className={`${styles.FieldGroup} ${styles.description}`}>
                  <label>Task Description*</label>
                  <textarea
                    rows="6"
                    {...input}
                    placeholder="Task Description"
                  />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>

            <Field name="startDate" validate={required}>
              {({ input, meta }) => (
                <div className={`${styles.FieldGroup} ${styles.calendar}`}>
                  <label>Start Date*</label>
                  <DatePicker
                    {...input}
                    minDate={moment()}
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
                </div>
              )}
            </Field>
          </div>
          <Field name="understandConditions">
            {({ input }) => (
              <div className={styles.FieldGroup}>
                <p>
                  By checking, I understand that I can't edit the task contract
                  once created. I will only will be able to cancel the task.
                </p>
                <label className={styles.checkboxContainer}>
                  <input
                    type="checkbox"
                    {...input}
                    className={styles.conditionsCheckbox}
                  />
                  <span className={styles.customCheckbox} />
                </label>
              </div>
            )}
          </Field>
          <Button
            centered
            type="submit"
            theme="secondary"
            disabled={pristine || invalid}
            content="Add Task"
          />
        </form>
      )}
    />
  );
}
