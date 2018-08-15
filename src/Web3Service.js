/* eslint-disable */
import sigUtil from 'eth-sig-util';
import ethUtil from 'ethereumjs-util';
import Web3 from 'web3';
import { BigNumber } from 'bignumber.js/bignumber';
import { loggerAbi } from './contracts/abi/logger';
import { tribeAbi } from './contracts/abi/tribe';
import { smartTokenAbi } from './contracts/abi/smarttoken';
import { tribeStorageAbi } from './contracts/abi/tribestorage';

export default class Web3Service {
  web3;
  web3Socket;
  mainAccount;
  tribeContractWS;
  tribeStorageContractWS;
  loggerContractWS;
  smartTokenContractWS;

  async init() {
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
    }
    const provider = new Web3.providers.WebsocketProvider(
      'ws://localhost:8545',
    );
    this.web3Socket = new Web3(provider);
    this.mainAccount = await this.getMainAccount();
    await this.initAllContracts();
  }

  async getMainAccount() {
    const accounts = await this.web3.eth.getAccounts();
    if (accounts.length === 0) {
      throw new Error('No accounts.');
    }
    return accounts[0];
  }

  async initContract(abi, address) {
    return await new this.web3.eth.Contract(abi, address);
  }

  async initContractSocket(abi, address) {
    return await new this.web3Socket.eth.Contract(abi, address);
  }

  async tribeIsMember(address) {
    return await this.tribeContractWS.methods
      .isMember(address)
      .call({ from: this.mainAccount });
  }

  async tribeAvailableDevFund() {
    return await this.tribeContractWS.methods
      .getAvailableDevFund()
      .call({ from: this.mainAccount });
  }

  async subscribeToTaskCreatedEvent() {
    await this.loggerContractWS.events
      .TaskCreated(
        {
          filter: null,
          fromBlock: 0,
        },
        function(error, event) {
          console.log('loggerContract callback:', event);
        },
      )
      .on('data', function(event) {
        console.log('data', event); // same results as the optional callback above
      })
      .on('changed', function(event) {
        // remove event from local database
      })
      .on('error', console.error);
  }

  async initAllContracts() {
    this.tribeContractWS = await this.initContractSocket(
      tribeAbi,
      '0xe2102bd2470d118c52459df5ca9220eafc81ac1f',
    );
    this.tribeStorageContractWS = await this.initContractSocket(
      tribeStorageAbi,
      '0x18e4a243fb89579000fa0c7b66b7f5c9db6a18fe',
    );
    this.loggerContractWS = await this.initContractSocket(
      loggerAbi,
      '0x44b52d30315599edb120c0f3e9da423d53074fee',
    );
    this.smartTokenContractWS = await this.initContract(
      smartTokenAbi,
      '0xfd7552a65b5e8151a7dbf8aefaef917dc0ab7d5b',
    );
  }
}

const web3Service = new Web3Service();
(async () => {
  await web3Service.init();
  await web3Service.subscribeToTaskCreatedEvent();
})();

export const getAddress = async () => {
  return await web3Service.getMainAccount();
};

export const promptSign = async (rawMessage) => {
  const message = ethUtil.bufferToHex(new Buffer(rawMessage, 'utf8'));
  let address = await web3Service.getMainAccount();
  address = sigUtil.normalize(address);
  let signed = await web3Service.web3.eth.personal.sign(message, address);
  return signed;
};
