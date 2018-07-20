const Web3 = require('web3');
export const getAccount = async () => {
  let web3;
  if (typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider);
  }
  return web3.eth.getAccounts((err, accs) => {
    if (err != null) {
      throw new Error(err);
    }

    if (accs.length === 0) {
      throw new Error('No accounts.');
    }
    // TODO need for more than first account?
    return accs[0];
  });
};
