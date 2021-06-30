/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Data, Layout } from 'plotly.js';
import * as actions from './actions';

export interface ModelExplanationsState {
  loadingFeatureImportance: boolean
  loadingFeatureProfile: boolean
  featureImportance: {
    data?: Data
    layout?: Layout
  },
  featureProfile?: {
    data?: Data
    layout?: Layout
  }
}

const initialState: ModelExplanationsState = {
  loadingFeatureImportance: true,
  loadingFeatureProfile: false,
  featureImportance: {
    data: undefined,
    layout: undefined,
  },
  featureProfile: undefined,
};

const modelExplanations = createSlice({
  name: 'modelExplanations',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(actions.fetchFeatureImportance.fulfilled, (state, action) => {
      state.featureImportance = {
        data: action.payload.data,
        layout: action.payload.layout,
      };

      state.loadingFeatureImportance = false;
    });

    builder.addCase(actions.fetchFeatureImportance.pending, (state) => {
      state.loadingFeatureImportance = true;
    });

    builder.addCase(actions.fetchFeatureProfile.pending, (state) => {
      state.loadingFeatureProfile = true;
    });

    builder.addCase(actions.fetchFeatureProfile.fulfilled, (state, action) => {
      state.featureProfile = {
        data: action.payload.data,
        layout: action.payload.layout,
      };

      state.loadingFeatureProfile = false;
    });
  },
});

export default modelExplanations.reducer;
