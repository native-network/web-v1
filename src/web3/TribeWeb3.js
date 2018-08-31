import { tribeAbi } from '../contracts/abi/tribe';
import { smartTokenAbi } from '../contracts/abi/smarttoken';
import { getAddress } from '../web3/Web3Service';

export default class TribeService {
  web3Service;
  tribe;
  tribeContractAddress;
  tribeSmartTokenContractAddress;
  tribeContract;

  constructor(tribe, web3Instance) {
    this.tribe = tribe;
    this.web3Service = web3Instance;
  }

  async initContracts() {
    this.tribeContract = await this.web3Service.initContractRemote(
      tribeAbi,
      this.tribe.address,
    );
    this.smartTokenContractWS = await this.web3Service.initContractRemote(
      smartTokenAbi,
      this.tribe.tokenAddress,
    );
  }
  async tribeIsMember(address) {
    return await this.tribeContract.methods
      .isMember(address)
      .call({ from: getAddress() });
  }

  async getPrice() {
    return await this.smartTokenContractWS.methods.price().call();
  }

  async getSymbol() {
    return await this.smartTokenContractWS.methods.symbol().call();
  }

  async getTotalSupply() {
    return await this.smartTokenContractWS.methods.totalSupply().call();
  }

  async getTokenBalance(address) {
    console.log(address); // eslint-disable-line
    return await this.smartTokenContractWS.methods.balanceOf(address).call();
  }

  async tribeAvailableDevFund() {
    return await this.tribeContract.methods
      .getAvailableDevFund()
      .call({ from: getAddress() });
  }
}
