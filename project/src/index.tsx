import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

import { store } from './store';
import HistoryRouter from './components/history-route/history-route';
import { browserHistory } from './browser-history';

import App from './components/app/app';
import { checkAuthAction } from './store/user-slice/user-slice';
import { fetchOffersAction } from './store/offers-slice/offers-slice';
import { rollbarConfig } from './utils/const';

import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <HistoryRouter history={browserHistory}>
            <ToastContainer />
            <App />
          </HistoryRouter>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  </React.StrictMode>,
  document.querySelector('#root'),
);
