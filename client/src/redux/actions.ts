import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api';
import {
  DataSetResponse,
  FeatureImportanceResponse,
  FeatureProfileResponse,
  MetadataResponse,
  PerformanceResponse,
  PredictionBreakdownResponse,
} from '../api';

interface FetchFeatureProfilePayload {
    name: string
}

interface FetchDataSetPayload {
  skip: number
  take: number
}

interface FetchPredictionBreakdownPayload {
  index: number
}

interface UpdateSelectionPayload {
  [ key: string]: boolean | number []
}

export const fetchMetadata = createAsyncThunk<
  MetadataResponse>('metadata/fetch', async () => {
    const data = await api.fetchMetadata();
    return data;
  });

export const fetchModelPerformance = createAsyncThunk<
  PerformanceResponse>('performance/fetch', async () => {
    const data = await api.fetchModelPerformance();
    return data;
  });

export const fetchFeatureImportance = createAsyncThunk<
  FeatureImportanceResponse>('feature-importance/fetch', async () => {
    const data = await api.fetchFeatureImportance();
    return data;
  });

export const fetchFeatureProfile = createAsyncThunk<
  FeatureProfileResponse, FetchFeatureProfilePayload>(
    'feature-profile/fetch', async (payload) => {
      const data = await api.fetchFeatureProfile(payload.name);
      return data;
    },
  );

export const fetchDataSet = createAsyncThunk<DataSetResponse, FetchDataSetPayload>(
  'predictions/fetch-dataset', async (payload) => {
    const data = await api.fetchDataSet(payload.skip, payload.take);
    return data;
  },
);

export const fetchPredictionBreakdown = createAsyncThunk<
  PredictionBreakdownResponse,
  FetchPredictionBreakdownPayload
>(
  'predictions/fetch-breakdown', async (payload) => {
    const data = await api.fetchPredictionBreakdown(payload.index);
    return data;
  },
);

export const updatePredictionSelection = createAction<UpdateSelectionPayload>('updatePredictionSelection');
