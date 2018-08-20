/* eslint-disable */
import sigUtil from 'eth-sig-util';
import ethUtil from 'ethereumjs-util';
import Web3 from 'web3';
import { loggerAbi } from '../contracts/abi/logger';
import { tribeAbi } from '../contracts/abi/tribe';
import { smartTokenAbi } from '../contracts/abi/smarttoken';
import { tribeStorageAbi } from '../contracts/abi/tribestorage';

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
  }

  async initContracts() {
    this.tribeContractWS = await this.web3Service.initContractSocket(
      tribeAbi,
      this.tribe.address,
    );
    this.smartTokenContractWS = await this.web3Service.initContract(
      smartTokenAbi,
      this.tribe.tokenAddress,
    );
  }
}
