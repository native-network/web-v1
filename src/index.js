import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import configureStore, { history } from './store';
import { getCommunities } from './actions/allCommunitiesActions';
import { getUserWalletAddress } from './actions/userWalletActions';

import './index.css';
import App from './components/App';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

store.dispatch(getCommunities());
store.dispatch(getUserWalletAddress());

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
