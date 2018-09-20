import sigUtil from 'eth-sig-util';
import ethUtil from 'ethereumjs-util';
import Web3 from 'web3';
import Web3ServiceMock from './Web3ServiceMock';
import { ETH_CONSTANT } from '../utils/constants';

export default class Web3Service {
  web3;
  web3Remote;
  mainAccount;

  async init() {
    let provider;
    const providerType =
      process.env.REMOTE_WEB3_PROVIDER_TYPE === 'websocket'
        ? 'WebSocketProvider'
        : 'HttpProvider';
    provider = new Web3.providers[providerType](
      process.env.REMOTE_WEB3_PROVIDER,
    );
    this.web3 =
      typeof window.web3 !== 'undefined'
        ? new Web3(window.web3.currentProvider)
        : new Web3(provider);
    this.web3Remote = new Web3(provider);
    this.mainAccount = await this.getMainAccount();
  }

  getMainAccount() {
    return new Promise((resolve, reject) => {
      return this.web3.eth
        .getAccounts()
        .then((accts) => {
          if (!accts.length) return reject('No account found.');

          return resolve(accts[0]);
        })
        .catch((err) => reject(err));
    });
  }

  async getAccountBalance(address) {
    return await new this.web3.eth.getBalance(address);
  }

  async initContract(abi, address) {
    return await new this.web3.eth.Contract(abi, address);
  }

  async initContractRemote(abi, address) {
    return await new this.web3Remote.eth.Contract(abi, address);
  }
}

const web3Service =
  process.env.NODE_ENV === 'test' ? new Web3ServiceMock() : new Web3Service();

(async () => {
  await web3Service.init();
})();

export const getWeb3ServiceInstance = () => {
  return web3Service;
};

export const getAddress = () => {
  return web3Service
    .getMainAccount()
    .then((data) => data)
    .catch((err) => {
      throw new Error(err);
    });
};

export const getBalance = async (address) => {
  const balance = await web3Service.getAccountBalance(address);
  return { ...ETH_CONSTANT, balance };
};

export const promptSign = async (rawMessage) => {
  const message = ethUtil.bufferToHex(new Buffer(rawMessage, 'utf8'));
  let address = await web3Service.getMainAccount();
  address = sigUtil.normalize(address);
  let signed = await web3Service.web3.eth.personal.sign(message, address);
  return signed;
};
