import { configureStore, createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
  modelType: 'unknown',
  currentSection: 'model',
};

const store = configureStore({
  reducer: createReducer(initialState, (builder) => {
    builder.addCase(actions.fetchMetadata.fulfilled, (state, action) => ({
      ...state,
      modelType: action.payload.type,
    }));

    builder.addCase(actions.switchSection, (state, action) => ({
      ...state,
      currentSection: action.payload.section,
    }));
  }),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
