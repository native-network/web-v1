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
    let gasPrice = await this.getGasPrice();
    gasPrice = gasPrice * 1.5;
    return new Promise((resolve, reject) => {
      let transactionHash;
      const approve = this.smartTokenContractWS.methods
        .approve(receivingAddress, transactionAmount)
        .send({ from: this.web3Service.mainAccount, gasPrice });

      approve.on('transactionHash', (hash) => {
        if (cb) {
          cb(hash);
          transactionHash = hash;
        }
      });
      approve.on('error', () =>
        reject('There was a problem with the approval process.'),
      );
      const checkTransaction = setInterval(async () => {
        if (transactionHash) {
          const receipt = await this.web3Service.web3.eth.getTransactionReceipt(
            transactionHash,
          );
          if (receipt) {
            clearInterval(checkTransaction);
            resolve(receipt);
          }
        }
      }, 1000);
    });
  }

  async buyWithToken(sendingAddress, transactionAmount, cb) {
    let gasPrice = await this.getGasPrice();
    gasPrice = gasPrice * 1.25;

    return new Promise((resolve, reject) => {
      let transactionHash;
      const buyWithToken = this.smartTokenContractWS.methods
        .buyWithToken(sendingAddress, transactionAmount)
        .send({ from: this.web3Service.mainAccount, gasPrice });

      buyWithToken.on('transactionHash', (hash) => {
        if (cb) {
          cb(hash);
          transactionHash = hash;
        }
      });

      buyWithToken.on('error', () =>
        reject('There was a problem with the purchase process.'),
      );
      const checkTransaction = setInterval(async () => {
        if (transactionHash) {
          const receipt = await this.web3Service.web3.eth.getTransactionReceipt(
            transactionHash,
          );
          if (receipt) {
            clearInterval(checkTransaction);
            resolve(receipt);
          }
        }
      }, 1000);
    });
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
    let gasPrice = await this.getGasPrice();
    gasPrice = gasPrice * 1.25;

    return new Promise((resolve, reject) => {
      let transactionHash;

      const stakeCommunityTokens = this.communityContract.methods
        .stakeCommunityTokens()
        .send({ from: this.web3Service.mainAccount, gasPrice });

      stakeCommunityTokens.on('transactionHash', (hash) => {
        if (cb) {
          cb(hash);
          transactionHash = hash;
        }
      });
      stakeCommunityTokens.on('error', () =>
        reject('There was a problem staking into that community.'),
      );

      const checkTransaction = setInterval(async () => {
        if (transactionHash) {
          const receipt = await this.web3Service.web3.eth.getTransactionReceipt(
            transactionHash,
          );
          if (receipt) {
            clearInterval(checkTransaction);
            resolve(receipt);
          }
        }
      }, 1000);
    });
  }
}
