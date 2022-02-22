import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app';

import { offers } from './mocks/offers';
import { reviews } from './mocks/reviews';

const DataMainPage = {
  NUMBER_OF_PLACES: 5,
};

ReactDOM.render(
  <React.StrictMode>
    <App numberOfPlaces={DataMainPage.NUMBER_OF_PLACES} offers={offers} reviews={reviews} />
  </React.StrictMode>,
  document.querySelector('#root'),
);
