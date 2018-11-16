import { communityAbi } from '../contracts/abi/community';
import { smartTokenAbi } from '../contracts/abi/smarttoken';
import { getAddress } from '../web3/Web3Service';
import { communityStorageAbi } from '../contracts/abi/communitystorage';

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

    this.communityRemoteContract = await this.web3Service.initContractRemote(
      communityAbi,
      this.community.address,
    );
    /* eslint-disable */
    console.log('this.communityRemoteContract', this.communityRemoteContract);
    // const communityAccount = await this.communityRemoteContract.methods
    //   .communityAccoun;

    this.smartTokenRemoteContract = await this.web3Service.initContractRemote(
      smartTokenAbi,
      this.community.tokenAddress,
    );

    this.smartTokenContractWS = await this.web3Service.initContract(
      smartTokenAbi,
      this.community.tokenAddress,
    );

    this.communityStorageRemoteContract = await this.web3Service.initContractRemote(
      communityStorageAbi,
      communityAccount,
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
    const stake = await this.communityRemoteContract.methods
      .minimumStakingRequirement()
      .call();
    return stake;
  }

  async getPrice() {
    const price = await this.smartTokenRemoteContract.methods.price().call();
    return price;
  }

  async getSymbol() {
    const symbol = await this.smartTokenRemoteContract.methods.symbol().call();
    return symbol;
  }

  async getTotalSupply() {
    const supply = await this.smartTokenRemoteContract.methods
      .totalSupply()
      .call();
    return supply;
  }

  async getTokenBalance(address) {
    return await this.smartTokenRemoteContract.methods
      .balanceOf(address)
      .call();
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
        reject(new Error('There was a problem with the approval process.')),
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
        reject(new Error('There was a problem with the purchase process.')),
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

  async getAmountStaked(address) {
    // TODO: Check this method call, I'm not 100% on if this is the corect format for getting the val of a public
    // TODO: key/value variable in a contract
    const amountStaked = this.communityStorageRemoteContract.methods
      .stakedBalances(address)
      .call();
    return amountStaked;
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
        reject(new Error('There was a problem staking into that community.')),
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
