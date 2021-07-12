import reducer from './modelExplanations';

test('should have an initial state', () => {
  const state = reducer(undefined, { type: 'empty' });
  expect(state).toMatchObject({
    loadingFeatureImportance: true,
    loadingFeatureProfile: false,
    featureImportance: {
      data: undefined,
      layout: undefined,
    },
    featureProfile: undefined,
  });
});

describe('fetchFeatureImportance', () => {
  describe('when fulfilled', () => {
    it('should return the correct state', () => {
      const state = reducer(undefined, { type: 'feature-importance/fetch/fulfilled', payload: { data: [], layout: {} } });
      expect(state.featureImportance).toMatchObject({ data: [], layout: {} });
    });

    it('should unset the loading state', () => {
      const state = reducer(undefined, { type: 'feature-importance/fetch/fulfilled', payload: { data: [], layout: {} } });
      expect(state.loadingFeatureImportance).toBe(false);
    });
  });
});

describe('fetchFeatureProfile', () => {
  describe('when fulfilled', () => {
    it('should return the correct state', () => {
      const state = reducer(undefined, { type: 'feature-profile/fetch/fulfilled', payload: { data: [], layout: {} } });
      expect(state.featureProfile).toMatchObject({ data: [], layout: {} });
    });

    it('should unset the loading state', () => {
      const state = reducer(undefined, { type: 'feature-profile/fetch/fulfilled', payload: { data: [], layout: {} } });
      expect(state.loadingFeatureProfile).toBe(false);
    });
  });

  describe('when pending', () => {
    it('should set the loading state', () => {
      const state = reducer(undefined, { type: 'feature-profile/fetch/pending' });
      expect(state.loadingFeatureProfile).toBe(true);
    });
  });
});
