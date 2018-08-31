import eth from '../assets/img/eth.svg';
import { getWeb3ServiceInstance } from '../web3/Web3Service';
import Tribe3 from '../web3/TribeWeb3';

const { web3 } = getWeb3ServiceInstance();
const { toWei } = web3.utils;

export const currencies = [
  {
    symbol: 'ETH',
    iconUrl: eth,
    price: toWei('1', 'ether').toString(),
  },
];

export const tribeContractInstance = async (tribe) => {
  const { id } = tribe;
  const tribe3 = new Tribe3(tribe, getWeb3ServiceInstance());
  await tribe3.initContracts();
  return { id, tribe3 };
};

export const allTribeContractInstances = (array) =>
  array.map((tribe) => tribeContractInstance(tribe));
