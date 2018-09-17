import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import ReduxToastr from 'react-redux-toastr';

import configureStore, { history } from './store';
import { getCommunities } from './actions/communitiesActions';
import {
  getUserWalletAddress,
  getUserWalletCommunityBalance,
} from './actions/userWalletActions';

import './index.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import App from './components/App';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

store.dispatch(getCommunities());
store.dispatch(getUserWalletAddress()).then(({ address }) => {
  if (address) store.dispatch(getUserWalletCommunityBalance(address));
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <ReduxToastr
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar={false}
        />
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
