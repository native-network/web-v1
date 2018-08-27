import sigUtil from 'eth-sig-util';
import ethUtil from 'ethereumjs-util';
import Web3 from 'web3';

export default class Web3Service {
  web3;
  web3Remote;
  mainAccount;

  async init() {
    let provider;
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
    }
    const providerType =
      process.env.REMOTE_WEB3_PROVIDER_TYPE === 'websocket'
        ? 'WebSocketProvider'
        : 'HttpProvider';
    provider = new Web3.providers[providerType](
      process.env.REMOTE_WEB3_PROVIDER,
    );

    this.web3Remote = new Web3(provider);
    this.mainAccount = await this.getMainAccount();
  }

  async getMainAccount() {
    const accounts = await this.web3.eth.getAccounts();
    if (accounts.length === 0) {
      throw new Error('No accounts.');
    }
    return accounts[0];
  }

  async getAccountBalance(address) {
    return await new this.web3.eth.getBalance(address);
  }

  async initContract(abi, address) {
    return await new this.web3.eth.Contract(abi, address);
  }

  async initContractRemote(abi, address) {
    return await new this.web3Remote.eth.Contract(abi, address);
  }
}

const web3Service = new Web3Service();
(async () => {
  await web3Service.init();
})();

export const getWeb3ServiceInstance = () => {
  return web3Service;
};

export const getAddress = async () => {
  return await web3Service.getMainAccount();
};

export const getBalance = async (address) => {
  return await web3Service.getAccountBalance(address);
};

export const promptSign = async (rawMessage) => {
  const message = ethUtil.bufferToHex(new Buffer(rawMessage, 'utf8'));
  let address = await web3Service.getMainAccount();
  address = sigUtil.normalize(address);
  let signed = await web3Service.web3.eth.personal.sign(message, address);
  return signed;
};
