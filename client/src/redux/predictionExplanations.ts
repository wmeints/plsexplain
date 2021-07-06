/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import * as actions from './actions';

export interface PredictionExplanationsState {
  pager: {
    skip: number
    take: number
    total: number
  }
  data: Array<{ [key: string]: string }>
  loadingData: boolean
}

const initialState: PredictionExplanationsState = {
  pager: {
    skip: 0,
    take: 20,
    total: 0,
  },
  data: [],
  loadingData: true,
};

const predictionExplanations = createSlice({
  name: 'predictionExplanations',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(actions.fetchDataSet.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.pager = action.payload.pager;
      state.loadingData = false;
    });
  },
});

export default predictionExplanations.reducer;
