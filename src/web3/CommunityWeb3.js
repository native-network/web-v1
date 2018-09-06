import { communityAbi } from '../contracts/abi/community';
import { smartTokenAbi } from '../contracts/abi/smarttoken';
import { getAddress } from '../web3/Web3Service';

export default class CommunityService {
  web3Service;
  community;
  communityContractAddress;
  communitySmartTokenContractAddress;
  communityContract;

  constructor(community, web3Instance) {
    this.community = community;
    this.web3Service = web3Instance;
  }

  async initContracts() {
    this.communityContract = await this.web3Service.initContractRemote(
      communityAbi,
      this.community.address,
    );
    this.smartTokenContractWS = await this.web3Service.initContractRemote(
      smartTokenAbi,
      this.community.tokenAddress,
    );
  }
  async communityIsMember(address) {
    return await this.communityContract.methods
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
    return await this.smartTokenContractWS.methods.balanceOf(address).call();
  }

  async communityAvailableDevFund() {
    return await this.communityContract.methods
      .getAvailableDevFund()
      .call({ from: getAddress() });
  }
}
