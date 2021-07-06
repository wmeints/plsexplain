import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';
import {
  DataSetResponse,
  FeatureImportanceResponse,
  FeatureProfileResponse,
  MetadataResponse,
  PerformanceResponse,
} from '../api';

interface FetchFeatureProfilePayload {
    name: string
}

interface FetchDataSetPayload {
  page: number
}

export const fetchMetadata = createAsyncThunk<MetadataResponse>('metadata/fetch', async () => {
  const data = await api.fetchMetadata();
  return data;
});

export const fetchModelPerformance = createAsyncThunk<PerformanceResponse>('performance/fetch', async () => {
  const data = await api.fetchModelPerformance();
  return data;
});

export const fetchFeatureImportance = createAsyncThunk<FeatureImportanceResponse>('feature-importance/fetch', async () => {
  const data = await api.fetchFeatureImportance();
  return data;
});

export const fetchFeatureProfile = createAsyncThunk<FeatureProfileResponse, FetchFeatureProfilePayload>('feature-profile/fetch', async (payload) => {
  const data = await api.fetchFeatureProfile(payload.name);
  return data;
});

export const fetchDataSet = createAsyncThunk<DataSetResponse, FetchDataSetPayload>('predictions/fetch-dataset', async (payload) => {
  const data = await api.fetchDataSet(payload.page);
  return data;
});
