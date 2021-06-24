import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './api';

export const fetchMetadata = createAsyncThunk('fetchMetadata', async () => {
  const data = await api.fetchMetadata();
  return data;
});

export const switchSection = createAction<{ section: string }>('switchSection');
