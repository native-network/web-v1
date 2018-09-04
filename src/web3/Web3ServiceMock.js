// instead of using a Jest mock function, this will effecitvely stub out all
// web3 actions
import Web3 from 'web3';
import FakeProvider from 'web3-fake-provider';

const fakeProvider = new FakeProvider();

export default class Web3ServiceMock {
  web3;
  web3Remote;
  mainAccount;

  async init() {
    // if (typeof window.web3 !== 'undefined') {
    this.web3 = new Web3(fakeProvider);
    // }

    this.web3Remote = new Web3(fakeProvider);
    this.mainAccount = await this.getMainAccount();
  }

  async getMainAccount() {
    return Promise.resolve('0x407d73d8a49eeb85d32cf465507dd71d507100c1');
  }

  async getAccountBalance() {
    return Promise.resolve('1234'); // BigNumber expects strings
  }

  async initContract() {
    return Promise.resolve({});
  }

  async initContractRemote() {
    return Promise.resolve({});
  }
}
