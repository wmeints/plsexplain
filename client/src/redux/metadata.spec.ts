import reducer, { MetadataState } from './metadata';

test('should return the initial state', () => {
  expect(reducer(undefined, { type: 'empty' })).toMatchObject({
    metadataLoading: true,
    performanceDataLoading: true,
    modelClass: 'unknown',
    modelType: 'unknown',
    performance: {},
  });
});

describe('fetchMetadata', () => {
  describe('when fulfilled', () => {
    let state: MetadataState;

    const action = {
      type: 'metadata/fetch/fulfilled',
      payload: { class: 'foo', type: 'classification' },
    };

    beforeEach(() => {
      state = reducer(undefined, action);
    });

    it('should set metadataLoading to false', () => {
      expect(state.metadataLoading).toBe(false);
    });

    it('should update the state', () => {
      expect(state.modelClass).toBe('foo');
      expect(state.modelType).toBe('classification');
    });
  });
});

describe('fetchPerformance', () => {
  describe('when fulfilled', () => {
    let state: MetadataState;

    const action = {
      type: 'performance/fetch/fulfilled',
      payload: {
        r2: 0.0,
        mae: 0.0,
        mse: 0.0,
        rmse: 0.0,
        mad: 0.0,
      },
    };

    beforeEach(() => {
      state = reducer(undefined, action);
    });

    it('should set performanceDataLoading to false', () => {
      expect(state.performanceDataLoading).toBe(false);
    });

    it('should update the state', () => {
      expect(state.performance).toMatchObject({
        r2: 0.0,
        mae: 0.0,
        mse: 0.0,
        rmse: 0.0,
        mad: 0.0,
      });
    });
  });
});
