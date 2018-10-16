import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import ReduxToastr from 'react-redux-toastr';

import configureStore, { history } from './store';
import { getCommunities } from './actions/communitiesActions';
import { getUserWalletAddress } from './actions/userWalletActions';
import { checkNetwork } from './actions/userSessionActions';

import './index.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import App from './components/App';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

store.dispatch(checkNetwork()).then(({ doesNetworkMatch }) => {
  if (doesNetworkMatch) {
    store.dispatch(getCommunities()).then(({ communities }) => {
      if (communities) {
        return store.dispatch(getUserWalletAddress());
      }
    });
  }
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Fragment>
        <ReduxToastr
          transitionIn="bounceInDown"
          transitionOut="bounceOutUp"
          progressBar={false}
          timeOut={3000}
          closeOnToastrClick
        />
        <App />
      </Fragment>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
