import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import metadataReducer from './metadata';
import navigationReducer from './navigation';

export const history = createBrowserHistory();

const store = configureStore({
  reducer: {
    router: connectRouter(history),
    metadata: metadataReducer,
    navigation: navigationReducer,
  },
  middleware: [
    routerMiddleware(history),
  ],
});

export type State = ReturnType<typeof store.getState>;
export default store;
