/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import * as actions from './actions';

export interface ClassificationPerformanceState {
  auc: number
  precision: number
  recall: number
  accuracy: number
  f1: number
}

export interface RegressionPerformanceState {
  r2: number
  mse: number
  rmse: number
  mae: number
  mad: number
}

export type PerformanceState =
  | RegressionPerformanceState
  | ClassificationPerformanceState;

export interface MetadataState {
  modelType: string
  modelClass: string
  performance?: PerformanceState
  performanceDataLoading: boolean
  metadataLoading: boolean
}

const initialState: MetadataState = {
  modelType: 'unknown',
  modelClass: 'unknown',
  performance: undefined,
  performanceDataLoading: true,
  metadataLoading: true,
};

const metadata = createSlice({
  name: 'metadata',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(actions.fetchMetadata.fulfilled, (state, action) => {
      state.modelType = action.payload.type;
      state.modelClass = action.payload.class;
      state.metadataLoading = false;
    });

    builder.addCase(actions.fetchModelPerformance.fulfilled, (state, action) => {
      state.performance = action.payload as PerformanceState;
      state.performanceDataLoading = false;
    });
  },
});

export default metadata.reducer;
