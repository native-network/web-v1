import sigUtil from 'eth-sig-util';
import ethUtil from 'ethereumjs-util';
import Web3 from 'web3';

export default class Web3Service {
  web3;
  web3Socket;
  mainAccount;
  tribeContractWS;
  tribeStorageContractWS;
  loggerContractWS;
  smartTokenContractWS;

  async init() {
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
    }
    const provider = new Web3.providers.WebsocketProvider(
      'ws://localhost:8545',
    );
    this.web3Socket = new Web3(provider);
    this.mainAccount = await this.getMainAccount();
  }

  async getMainAccount() {
    const accounts = await this.web3.eth.getAccounts();
    if (accounts.length === 0) {
      throw new Error('No accounts.');
    }
    return accounts[0];
  }

  async initContract(abi, address) {
    return await new this.web3.eth.Contract(abi, address);
  }

  async initContractSocket(abi, address) {
    return await new this.web3Socket.eth.Contract(abi, address);
  }

  async tribeIsMember(address) {
    return await this.tribeContractWS.methods
      .isMember(address)
      .call({ from: this.mainAccount });
  }

  async tribeAvailableDevFund() {
    return await this.tribeContractWS.methods
      .getAvailableDevFund()
      .call({ from: this.mainAccount });
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

export const promptSign = async (rawMessage) => {
  const message = ethUtil.bufferToHex(new Buffer(rawMessage, 'utf8'));
  let address = await web3Service.getMainAccount();
  address = sigUtil.normalize(address);
  let signed = await web3Service.web3.eth.personal.sign(message, address);
  return signed;
};
