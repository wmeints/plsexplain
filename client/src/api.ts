import { Layout, Data } from 'plotly.js';

export interface MetadataResponse {
  type: string
  class: string
}

export interface ClassificationPerformanceResponse {
  type: string
  precision: number
  recall: number
  accuracy: number
  f1: number
  auc: number
}

export interface RegressionPerformanceResponse {
  type: string
  mse: number
  mae: number
  mad: number
  rmse: number
  r2: number
}

export type PerformanceResponse =
  | ClassificationPerformanceResponse
  | RegressionPerformanceResponse;

export interface FeatureImportanceResponse {
  data: Data
  layout: Layout
}

export interface FeatureProfileResponse {
  data: Data
  layout: Layout
}

export interface PredictionFeatureProfileResponse {
  data: Data
  layout: Layout
}

export interface DataSetResponse {
  data: Array<{ [key : string] : string}>,
  metadata: {
    columns: Array<string>
  }
  pager: {
    skip: number,
    take: number,
    total: number
  }
}

export interface PredictionBreakdownResponse {
  data: Data
  layout: Layout
}

export async function fetchMetadata(): Promise<MetadataResponse> {
  const response = await fetch('/api/metadata');
  const data = await response.json();

  return data;
}

export async function fetchModelPerformance() : Promise<PerformanceResponse> {
  const response = await fetch('/api/performance');
  const data = await response.json();

  return data;
}

export async function fetchFeatureImportance(): Promise<FeatureImportanceResponse> {
  const response = await fetch('/api/model/features');
  const data = await response.json();

  return data;
}

export async function fetchFeatureProfile(name: string): Promise<FeatureProfileResponse> {
  const response = await fetch(`/api/model/features/${name}`);
  const data = await response.json();

  return data;
}

export async function fetchDataSet(skip: number, take: number): Promise<DataSetResponse> {
  const response = await fetch(`/api/dataset?skip=${skip}&take=${take}`);
  const data = await response.json();

  return data;
}

export async function fetchPredictionBreakdown(
  index: number,
): Promise<PredictionBreakdownResponse> {
  const response = await fetch(`/api/predictions/${index}/breakdown`);
  const data = await response.json();

  return data;
}

export async function fetchPredictionProfile(
  index: number,
  feature: string,
): Promise<PredictionFeatureProfileResponse> {
  const response = await fetch(`/api/predictions/${index}/profile/${feature}`);
  const data = await response.json();

  return data;
}
