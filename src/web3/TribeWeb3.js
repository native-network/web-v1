import { tribeAbi } from '../contracts/abi/tribe';
import { smartTokenAbi } from '../contracts/abi/smarttoken';

export default class TribeService {
  web3Service;
  tribe;
  tribeContractAddress;
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
    this.smartTokenContractWS = await this.web3Service.initContractSocket(
      smartTokenAbi,
      this.tribe.tokenAddress,
    );
  }
}
