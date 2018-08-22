import Web3 from 'web3';
import eth from '../assets/img/eth.svg';
import native from '../assets/img/native.svg';

const web3 = new Web3();

export const currencies = [
  {
    symbol: 'ETH',
    iconUrl: eth,
    balance: 50,
    priceInWei: web3.utils.toWei('1', 'ether').toString(),
    inUsd: '$1,353.34',
  },
  {
    symbol: 'NT',
    iconUrl: native,
    balance: 1.9234,
    priceInWei: web3.utils.toWei('0.5', 'ether').toString(),
    inUsd: '$1,353.34',
  },
];
