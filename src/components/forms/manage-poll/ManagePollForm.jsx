import React from 'react';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import moment from 'moment';

import styles from './ManagePollForm.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import Button from '../../shared/button';
import FileUploader from '../../shared/file-uploader/FileUploader';

export default function ManagePollForm({ submitForm }) {
  const renderError = (error) => <span className={styles.Error}>{error}</span>;
  const required = (value) => (value ? undefined : 'Required');
  const validateTitle = (value) =>
    value.length > 9 ? undefined : 'Must be atleast 10 characters';
  const composeValidators = (...validators) => (value) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined,
    );

  return (
    <Form
      onSubmit={(values) => submitForm(values)}
      mutators={{
        ...arrayMutators,
      }}
      initialValues={{
        options: [{}, {}],
        endDate: '1',
      }}
      render={({
        handleSubmit,
        form: {
          mutators: { push },
        },
        pristine,
        invalid,
      }) => (
        <form className={styles.ManagePollForm} onSubmit={handleSubmit}>
          <div className={styles.ManagePollFields}>
            <div className={styles.GroupedFieldGroup}>
              <Field
                name="title"
                validate={composeValidators(required, validateTitle)}
              >
                {({ input, meta }) => (
                  <div className={styles.FieldGroup}>
                    <label>Poll Title</label>
                    <input {...input} type="text" placeholder="Poll Title" />
                    {meta.error && meta.touched && renderError(meta.error)}
                  </div>
                )}
              </Field>
              <Field name="description">
                {({ input, meta }) => (
                  <div className={styles.FieldGroup}>
                    <label>Poll Description</label>
                    <textarea
                      rows="6"
                      {...input}
                      placeholder="Poll Description"
                    />
                    {meta.error && meta.touched && renderError(meta.error)}
                  </div>
                )}
              </Field>
              <Field name="question" validate={required}>
                {({ input, meta }) => (
                  <div className={styles.FieldGroup}>
                    <label>Poll Question</label>
                    <input {...input} type="text" placeholder="Poll Question" />
                    {meta.error && meta.touched && renderError(meta.error)}
                  </div>
                )}
              </Field>

              <div className={styles.FieldGroup}>
                <p>Poll will start today: {moment().format('MM/DD/YYYY')}</p>
                <label>When will the poll end?</label>
              </div>
              <label className={styles.RadioField}>
                <Field
                  name="endDate"
                  component="input"
                  type="radio"
                  value="1"
                />
                1 Day
              </label>
              <label className={styles.RadioField}>
                <Field
                  name="endDate"
                  component="input"
                  type="radio"
                  value="3"
                />
                3 Days
              </label>
              <label className={styles.RadioField}>
                <Field
                  name="endDate"
                  component="input"
                  type="radio"
                  value="5"
                />
                5 Days
              </label>
            </div>

            <Field name="fileUrl" type="file">
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>File</label>
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

            <div className={styles.GroupedFieldGroup}>
              <FieldArray name="options">
                {({ fields }) =>
                  fields.map((name, index) => (
                    <div key={name}>
                      <Field
                        name={`options[${index}].name`}
                        key={index}
                        validate={index < 2 ? required : ''}
                      >
                        {({ input, meta }) => (
                          <div className={styles.FieldGroup}>
                            <label>Option {index + 1}</label>
                            <input {...input} type="text" />
                            {meta.error &&
                              meta.touched &&
                              renderError(meta.error)}
                          </div>
                        )}
                      </Field>
                    </div>
                  ))
                }
              </FieldArray>

              <Button
                centered
                type="button"
                theme="secondary"
                content="Add Option"
                clickHandler={() => push('options', undefined)}
              />
            </div>
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
