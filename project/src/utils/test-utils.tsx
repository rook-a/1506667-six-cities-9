// import { ReactNode } from 'react';
// import { Provider } from 'react-redux';
// import { createStore, AnyAction, Action, Store } from '@reduxjs/toolkit';
// import { render, RenderResult } from '@testing-library/react';
// import { rootReducer } from '../store/root-reducer';
// import { MemoryRouter } from 'react-router-dom';

// interface RenderWithRedux<S = any, A extends Action = AnyAction, I extends S = any> {
//   (
//     ui: ReactNode,
//     reduxOptions?: {
//       preloadedState?: I
//       store?: Store<S, A>
//     },
//   ): RenderResult
// }

// const renderWithRedux: RenderWithRedux = (
//   ui,
//   {
//     preloadedState,
//     store: createStore(rootReducer, preloadedState),
//   } = {},
// ) => ({
//   ...render(
//   <Provider store={store}>
//     <MemoryRouter>
//       {ui}
//     </MemoryRouter>
//   </Provider>),

// });

// export * from '@testing-library/react';
// export {renderWithRedux};
