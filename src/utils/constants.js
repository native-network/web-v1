import eth from '../assets/img/eth.svg';
import native from '../assets/img/native.svg';
import { getWeb3ServiceInstance } from '../web3/Web3Service';

const { web3 } = getWeb3ServiceInstance();
const { toWei } = web3.utils;

export const currencies = [
  {
    symbol: 'ETH',
    iconUrl: eth,
    balance: 50,
    priceInWei: toWei('1', 'ether').toString(),
    inUsd: '$1,353.34',
  },
  {
    symbol: 'NT',
    iconUrl: native,
    balance: 1.9234,
    priceInWei: toWei('0.5', 'ether').toString(),
    inUsd: '$1,353.34',
  },
];
