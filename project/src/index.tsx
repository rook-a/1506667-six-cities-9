import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { store } from './store';

import App from './components/app/app';
import { checkAuthAction } from './store/api-actions';
import { fetchOffersAction } from './store/offers-slice/offers-slice';

import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
  document.querySelector('#root'),
);
