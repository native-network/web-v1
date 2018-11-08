import ReactGA from 'react-ga';

export function initGoogleAnalytics() {
  ReactGA.initialize('UA-125567970-2');

  if (window.web3) {
    window.web3.version.getNode((er, res) => {
      ReactGA.set({ MetamaskVersion: res });
    });
  }

  ReactGA.set({ Web3v1: window.ethereum !== undefined });
}
