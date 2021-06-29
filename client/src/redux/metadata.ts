/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import * as actions from './actions';

const metadata = createSlice({
  name: 'metadata',
  initialState: {
    modelType: 'unknown',
    modelClass: '',
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(actions.fetchMetadata.fulfilled, (state, action) => {
      state.modelType = action.payload.type;
      state.modelClass = action.payload.class;
    });
  },
});

export default metadata.reducer;
