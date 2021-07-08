/* eslint-disable no-param-reassign */
import { createReducer, createSlice } from '@reduxjs/toolkit';
import { Data, Layout } from 'plotly.js';
import * as actions from './actions';

export interface PredictionExplanationsState {
  pager: {
    skip: number
    take: number
    total: number
  }
  data: Array<{ [key: string]: string }>
  predictionBreakdown?: {
    data: Data
    layout: Layout
  }
  loadingData: boolean
  loadingBreakdown: boolean
  metadata: {
    columns: Array<string>
  }
  selectionState: {
    [ key: string]: boolean | number []
  }
}

const initialState: PredictionExplanationsState = {
  pager: {
    skip: 0,
    take: 20,
    total: 0,
  },
  data: [],
  loadingData: true,
  loadingBreakdown: false,
  metadata: {
    columns: [],
  },
  selectionState: {},
};

const predictionExplanations = createSlice({
  name: 'predictionExplanations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actions.fetchDataSet.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.pager = action.payload.pager;
      state.loadingData = false;
      state.metadata = action.payload.metadata;
    });

    builder.addCase(actions.fetchPredictionBreakdown.pending, (state) => {
      state.loadingBreakdown = true;
    });

    builder.addCase(actions.fetchPredictionBreakdown.fulfilled, (state, action) => {
      state.predictionBreakdown = action.payload;
      state.loadingBreakdown = false;
    });

    builder.addCase(actions.updatePredictionSelection, (state, action) => {
      state.selectionState = action.payload;
    });
  },
});

export default predictionExplanations.reducer;
