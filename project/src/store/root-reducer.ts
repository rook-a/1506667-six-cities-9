import { combineReducers } from '@reduxjs/toolkit';
import { NameSpaces } from '../utils/const';
import { dataProcess } from './data-process/data-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpaces.DATA]: dataProcess.reducer,
  [NameSpaces.USER]: userProcess.reducer,
});
