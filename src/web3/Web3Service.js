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
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
        this.mainAccount = await this.getMainAccount();
      } catch (err) {
        console.log(err); // eslint-disable-line
      }
    } else if (window.web3) {
      this.web3 = new Web3(window.web3.currentProvider);
      this.mainAccount = await this.getMainAccount();
    } else {
      this.web3 = new Web3(provider);
    }
    this.web3Remote = new Web3(provider);
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

  async sendTransaction(address, value, cb) {
    return new Promise((resolve, reject) => {
      let transactionHash;
      const transaction = this.web3.eth.sendTransaction({
        from: this.mainAccount,
        to: address,
        value,
      });

      transaction.on('transactionHash', (hash) => {
        cb(hash);
        transactionHash = hash;
      });
      transaction.on('error', () =>
        reject('There was a problem with the purchase process.'),
      );

      const checkTransaction = setInterval(async () => {
        if (transactionHash) {
          const receipt = await this.web3.eth.getTransactionReceipt(
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

  async getAccountBalance(address) {
    return await this.web3.eth.getBalance(address);
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

export const sendTransaction = async (address, amount, cb) => {
  return await web3Service.sendTransaction(address, amount, cb);
};

export const getBalance = async (address) => {
  const balance = await web3Service.getAccountBalance(address);
  return { ...ETH_CONSTANT, balance };
};

export const promptSign = async (rawMessage) => {
  try {
    const message = ethUtil.bufferToHex(new Buffer(rawMessage, 'utf8'));
    const address = sigUtil.normalize(await web3Service.getMainAccount());
    return await web3Service.web3.eth.personal.sign(message, address);
  } catch (err) {
    return new Error(
      'You must enable access to your wallet to interact with Native.',
    );
  }
};
