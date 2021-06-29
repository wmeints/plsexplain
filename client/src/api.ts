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
  rmse: number
  r2: number
}

export type PerformanceResponse =
  | ClassificationPerformanceResponse
  | RegressionPerformanceResponse;

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
