/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const navigation = createSlice({
  name: 'navigation',
  initialState: {
    currentSection: 'model',
  },
  reducers: {
    showModelExplanations: (state) => {
      state.currentSection = 'model';
    },
    showPredictionExplanations: (state) => {
      state.currentSection = 'prediction';
    },
  },
});

export const { showModelExplanations, showPredictionExplanations } = navigation.actions;
export default navigation.reducer;
