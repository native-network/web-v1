import eth from '../assets/img/eth.svg';
import { getWeb3ServiceInstance } from '../web3/Web3Service';
import Community3 from '../web3/CommunityWeb3';

const { web3 } = getWeb3ServiceInstance();
const { toWei } = web3.utils;

export const currencies = [
  {
    symbol: 'ETH',
    iconUrl: eth,
    price: toWei('1', 'ether').toString(),
  },
];

export const communityContractInstance = async (community) => {
  const { id } = community;
  const community3 = new Community3(community, getWeb3ServiceInstance());
  await community3.initContracts();
  return { id, community3 };
};

export const allCommunityContractInstances = (array) =>
  array.map((community) => communityContractInstance(community));
