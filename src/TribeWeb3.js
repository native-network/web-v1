/* eslint-disable */
import sigUtil from 'eth-sig-util';
import ethUtil from 'ethereumjs-util';
import Web3 from 'web3';
import { loggerAbi } from './contracts/abi/logger';
import { tribeAbi } from './contracts/abi/tribe';
import { smartTokenAbi } from './contracts/abi/smarttoken';
import { tribeStorageAbi } from './contracts/abi/tribestorage';

export default class TribeService {
  web3Service;
  tribe;
  tribeContractAddress;
  tribeStorageContractAddress;
  loggerContractAddress;
  tribeSmartTokenContractAddress;

  constructor(tribe, web3Instance) {
    this.tribe = tribe;
    this.web3Service = web3Instance;
    this.initContracts();
  }

  async initContracts() {
    this.tribeContractWS = await this.web3Service.initContractSocket(
      tribeAbi,
      this.tribe.addresss,
    );
    this.tribeStorageContractWS = await this.web3Service.initContractSocket(
      tribeStorageAbi,
      this.tribeStorageContractAddress,
    );
    this.loggerContractWS = await this.web3Service.initContractSocket(
      loggerAbi,
      this.loggerContractAddress,
    );
    this.smartTokenContractWS = await this.web3Service.initContract(
      smartTokenAbi,
      this.tribeSmartTokenContractAddress,
    );
  }

  async subscribeToTaskCreatedEvent() {
    await this.loggerContractWS.events[TaskCreated](
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
}
