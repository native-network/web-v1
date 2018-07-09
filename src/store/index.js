import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { connectRouter, routerMiddleware } from 'connected-react-router'

import rootReducer from '../reducers';
export const history = createBrowserHistory();

export default function configureStore(initialState = {}) {
  return createStore(
    connectRouter(history)(rootReducer),
    initialState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      )
    )
  );
}
