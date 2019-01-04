import { getWeb3ServiceInstance } from '../../../web3/Web3Service';

const { web3 } = getWeb3ServiceInstance();

const { isAddress } = web3.utils;

export const composeValidators = (...validators) => (value) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const required = (value) => {
  return !!value && value.length ? undefined : 'Required';
};

export const validateAddress = (value) =>
  isAddress(value) ? undefined : 'Must be a valid wallet address';
