import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

const DataMainPage = {
  NUMBER_OF_PLACES: 5,
};

ReactDOM.render(
  <React.StrictMode>
    <App
      numberOfPlaces={DataMainPage.NUMBER_OF_PLACES}
    />
  </React.StrictMode>,
  document.querySelector('#root'));
