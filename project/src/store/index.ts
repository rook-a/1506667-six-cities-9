import { createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer } from './reducer';

export const store = createStore(reducer, composeWithDevTools());
