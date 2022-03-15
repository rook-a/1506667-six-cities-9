import { createAction } from '@reduxjs/toolkit';

import { AppRoute } from '../utils/const';

export const redirectToRoute = createAction<AppRoute>('main/redirectToRoute');
