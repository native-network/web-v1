/* eslint-disable */

import React from 'react';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { getWeb3ServiceInstance } from '../../../web3/Web3Service';
import Downshift from 'downshift';
import { capitalizeFirstLetter } from '../../../utils/helpers';

import styles from './ManageCommunityForm.css';

import Button from '../../shared/button';
import Icon from '../../shared/icon';
import FileUploader from '../../shared/file-uploader';
import Tooltip from '../../../components/shared/tooltip';

const { web3 } = getWeb3ServiceInstance();

const { fromWei } = web3.utils;

export default function ManageCommunityForm({ community, submitForm, clickPrivateCommunity }) {
  // Render Error
  const renderError = (error) => <span className={styles.Error}>{error}</span>;
  // Validations
  const validateName = (value) =>
    value === 'test' ? 'must not be test' : undefined;
  const validateQuorum = (value) =>
    value > 100 ? 'Quorum must not exceed 100%' : undefined;

  const socialMedia = ['facebook', 'twitter', 'instagram'];

  return (
    <Form
      mutators={{
        ...arrayMutators,
      }}
      initialValues={{
        name: community.name,
        location: community.location,
        curatorInfo: community.curatorInfo,
        communityPurpose: community.communityPurpose,
        votingPolicy: community.votingPolicy,
        revenueDistributionPolicy: community.revenueDistributionPolicy,
        membershipBenefits: community.membershipBenefits || [],
        socialMediaLinks: community.socialMediaLinks || [],
        telegramLink: community.telegramLink,
        quorum: community.quorum,
        tokenRequirements: fromWei(community.currency.minimumStake),
        privateCommunity: community.privateCommunity,
      }}
      onSubmit={(values) => submitForm(values)}
      render={({ handleSubmit, pristine, invalid, form }) => (
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
            <Field name="curatorInfo">
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Curator</label>
                  <input {...input} type="text" placeholder="Name" />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <Field name="communityPurpose">
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
              <Field name="votingPolicy">
                {({ input, meta }) => (
                  <div className={styles.FieldGroup}>
                    <label>
                      Voting Policy
                      {input.value.length > 0 ? (
                        <div className={styles.FileUploaderContainer}>
                          <input
                            readOnly
                            disabled
                            {...input}
                            value={input.value.split('_')[1]}
                            type="text"
                          />
                          <button
                            type="button"
                            onClick={() => input.onChange('')}
                          >
                            Add a new file
                          </button>
                        </div>
                      ) : (
                        <FileUploader
                          className={styles.Uploader}
                          {...input}
                          onChange={(value) => input.onChange(value.filename)}
                        />
                      )}
                    </label>
                    {meta.error && meta.touched && renderError(meta.error)}
                  </div>
                )}
              </Field>
              <Field name="revenueDistributionPolicy">
                {({ input, meta }) => (
                  <div className={styles.FieldGroup}>
                    <label>
                      Revenue Distribution
                      {input.value.length > 0 ? (
                        <div className={styles.FileUploaderContainer}>
                          <input
                            readOnly
                            disabled
                            {...input}
                            value={input.value.split('_')[1]}
                            type="text"
                          />
                          <button
                            type="button"
                            onClick={() => input.onChange('')}
                          >
                            Add a new file
                          </button>
                        </div>
                      ) : (
                        <FileUploader
                          className={styles.Uploader}
                          {...input}
                          onChange={(value) => input.onChange(value.filename)}
                        />
                      )}
                      {meta.error && meta.touched && renderError(meta.error)}
                    </label>
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

            <FieldArray name="membershipBenefits">
              {({ fields }) => (
                <div className={styles.FieldGroup}>
                  <label>Membership Benefits</label>
                  {fields.map((name, index) => (
                    <div key={name} className={styles.BenefitContainer}>
                      <Field name={name} component="input" />
                      <Button
                        className={styles.RemoveBenefit}
                        type="button"
                        clickHandler={() => fields.remove(index)}
                        content={<Icon icon="close" />}
                      />
                    </div>
                  ))}
                  <Button
                    centered
                    className={styles.AddBenefit}
                    type="button"
                    theme="secondary"
                    clickHandler={() => fields.push('')}
                    content="Add new benefit"
                  />
                </div>
              )}
            </FieldArray>
            <FieldArray name="socialMediaLinks">
              {({ fields }) => {
                if (fields && fields.value) {
                  const mediaValues = (fields.value || []).map(
                    (field) => field.name,
                  );
                  const missingMedia = socialMedia.filter(
                    (media) => !mediaValues.includes(media),
                  );

                  return (
                    <div className={styles.GroupedFieldGroup}>
                      <h2>Social Media</h2>
                      {fields.map((item, index) => {
                        const socialMediaName = capitalizeFirstLetter(
                          fields.value[index].name,
                        );

                        return (
                          <div key={index}>
                            <label>{socialMediaName}</label>
                            <div className={styles.BenefitContainer}>
                              <Field name={`${item}.link`} component="input" />

                              <Button
                                className={styles.RemoveBenefit}
                                type="button"
                                clickHandler={() => fields.remove(index)}
                                content={<Icon icon="close" />}
                              />
                            </div>
                          </div>
                        );
                      })}
                      {missingMedia.length > 0 ? (
                        <Downshift
                          itemToString={(item) => (item ? item : '')}
                          onSelect={(select) =>
                            fields.push({
                              name: select,
                              link: `https://${select}.com/`,
                            })
                          }
                        >
                          {({
                            getItemProps,
                            getMenuProps,
                            getToggleButtonProps,
                            isOpen,
                            highlightedIndex,
                          }) => (
                            <div className={styles.SocialMediaSelection}>
                              <button
                                {...getToggleButtonProps({
                                  className: styles.AddSocialMedia,
                                })}
                              >
                                Add Social Media{' '}
                                {isOpen ? (
                                  <Icon icon="caret-up" />
                                ) : (
                                  <Icon icon="caret-down" />
                                )}
                              </button>
                              {isOpen ? (
                                <ul
                                  {...getMenuProps({
                                    className: styles.SocialMediaList,
                                  })}
                                >
                                  {missingMedia.map((item, index) => (
                                    <li
                                      key={index}
                                      {...getItemProps({
                                        item,
                                        className: styles.SocialMediaListItem,
                                        style: {
                                          backgroundColor:
                                            highlightedIndex === index
                                              ? 'rgba(0, 0, 0, .1)'
                                              : 'transparent',
                                        },
                                      })}
                                    >
                                      {capitalizeFirstLetter(item)}
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </div>
                          )}
                        </Downshift>
                      ) : null}
                    </div>
                  );
                } else {
                  return null;
                }
              }}
            </FieldArray>
            <Field name="telegramLink">
              {({ input }) => (
                <div className={styles.FieldGroup}>
                  <label>Telegram Link</label>
                  <input {...input} type="text" />
                </div>
              )}
            </Field>
            <Field name="tokenRequirements" validate={validateName}>
              {({ input, meta }) => (
                <div className={styles.FieldGroup}>
                  <label>Tokens Required to Join</label>
                  <input
                    {...input}
                    readOnly
                    disabled
                    type="number"
                    placeholder="100"
                  />
                  {meta.error && meta.touched && renderError(meta.error)}
                </div>
              )}
            </Field>
            <Field name="privateCommunity" type="checkbox">
              {({ input }) => (
                <div className={styles.FieldGroup}>
                  <label>
                    Private Community
                    <Tooltip message="Only approved members are able to join a private community." />
                  </label>

                  <input className="checkbox" {...input} type="checkbox" onClick={(e) => clickPrivateCommunity(e)} />
                </div>
              )}
            </Field>
          </div>
          <Button
            className={styles.SubmitButton}
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
