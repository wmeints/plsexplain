import { configureStore } from '@reduxjs/toolkit';
import metadataReducer from './metadata';
import navigationReducer from './navigation';

const store = configureStore({
  reducer: {
    metadata: metadataReducer,
    navigation: navigationReducer,
  },
});

export type State = ReturnType<typeof store.getState>;
export default store;
