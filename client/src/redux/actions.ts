import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';
import { MetadataResponse, PerformanceResponse } from '../api';

export const fetchMetadata = createAsyncThunk<MetadataResponse>('metadata/fetch', async () => {
  const data = await api.fetchMetadata();
  return data;
});

export const fetchModelPerformance = createAsyncThunk<PerformanceResponse>('performance/fetch', async () => {
  const data = await api.fetchModelPerformance();
  return data;
});
