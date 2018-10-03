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
  async getGasPrice() {
    const gasPrice = await this.web3Service.web3.eth.getGasPrice();
    if (gasPrice) {
      return gasPrice;
    } else {
      // error has 10 Gwei default
      return 10000000000;
    }
  }
  async initContracts() {
    this.communityContract = await this.web3Service.initContract(
      communityAbi,
      this.community.address,
    );
    this.smartTokenContractWS = await this.web3Service.initContract(
      smartTokenAbi,
      this.community.tokenAddress,
    );
  }
  async communityIsMember(address) {
    try {
      return await this.communityContract.methods
        .isMember(address)
        .call({ from: getAddress() });
    } catch (err) {
      return err;
    }
  }

  async minimumStakingRequirement() {
    return await await this.communityContract.methods
      .minimumStakingRequirement()
      .call();
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

  async approve(receivingAddress, transactionAmount, cb) {
    try {
      let gasPrice = await this.getGasPrice();
      gasPrice = gasPrice * 1.5;
      return await this.smartTokenContractWS.methods
        .approve(receivingAddress, transactionAmount)
        .send({ from: this.web3Service.mainAccount, gasPrice })
        .on('transactionHash', (hash) => {
          if (cb) {
            cb(hash);
          }
        });
    } catch (err) {
      throw new Error('There was a problem with the approval process.');
    }
  }

  async buyWithToken(sendingAddress, transactionAmount, cb) {
    try {
      let gasPrice = await this.getGasPrice();
      gasPrice = gasPrice * 1.25;
      return await this.smartTokenContractWS.methods
        .buyWithToken(sendingAddress, transactionAmount)
        .send({ from: this.web3Service.mainAccount, gasPrice })
        .on('transactionHash', (hash) => {
          if (cb) {
            cb(hash);
          }
        });
    } catch (err) {
      throw new Error('There was a problem with the purchase process.');
    }
  }

  async communityAvailableDevFund() {
    try {
      return await this.communityContract.methods
        .getAvailableDevFund()
        .call({ from: getAddress() });
    } catch (err) {
      return err;
    }
  }

  async stake(cb) {
    try {
      let gasPrice = await this.getGasPrice();
      gasPrice = gasPrice * 1.25;
      await this.communityContract.methods
        .stakeCommunityTokens()
        .send({ from: this.web3Service.mainAccount, gasPrice })
        .on('transactionHash', (hash) => {
          if (cb) {
            cb(hash);
          }
        });
    } catch (err) {
      throw new Error('There was a problem staking into that community.');
    }
  }
}
