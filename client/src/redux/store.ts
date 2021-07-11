import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import metadataReducer from './metadata';
import modelExplanationsReducer from './modelExplanations';
import predictionExplanationsReducer from './predictionExplanations';

export const history = createBrowserHistory();

const store = configureStore({
  reducer: {
    router: connectRouter(history),
    metadata: metadataReducer,
    modelExplanations: modelExplanationsReducer,
    predictionExplanations: predictionExplanationsReducer,
  },
  middleware: [
    routerMiddleware(history),
    thunk,
  ],
});

export type State = ReturnType<typeof store.getState>;
export default store;
