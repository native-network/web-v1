import { BigNumber } from 'bignumber.js/bignumber';

const Web3 = require('web3');
let web3;

export const getAddress = async () => {
  if (typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
  }
  const accounts = await web3.eth.getAccounts();
  if (accounts.length === 0) {
    throw new Error('No accounts.');
  }
  // TODO need for more than first account?
  return accounts[0];
};

export const promptSign = async (nonce) => {
  const address = await getAddress();
  const messageHash = web3.utils.sha3(nonce.toString());
  const signedMessage = await web3.eth.sign(messageHash, address);
  return signedMessage;
};

export const sendTransaction = async (from, to, amount, gas) => {
  if (typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
  }
  amount = new BigNumber(amount);
  gas = new BigNumber(gas);
  return await web3.eth.sendTransaction({
    from: from,
    to: to,
    value: web3.utils.toWei(amount, 'ether'),
    gas: gas,
  });
};
