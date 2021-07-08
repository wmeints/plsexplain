import reducer, { PredictionExplanationsState } from './predictionExplanations';
import * as actions from './actions';

function applyFetchDataSetFulfilled() {
  const action = {
    type: 'predictions/fetch-dataset/fulfilled',
    payload: {
      data: [
        { stuff: 'Something' },
      ],
      pager: {
        skip: 0,
        take: 20,
        total: 0,
      },
      metadata: {
        columns: ['stuff', 'things'],
      },
    },
  };

  const result = reducer(undefined, action);
  return result;
}

function createInitialState() {
  const state = reducer(undefined, { type: '' });
  return state;
}

function applyFetchBreakdownFulfilled() {
  const action = {
    type: 'predictions/fetch-breakdown/fulfilled',
    payload: {
      data: [],
      layout: {},
    },
  };

  const result = reducer(undefined, action);

  return result;
}

test('should return initial state', () => {
  const result = createInitialState();

  expect(result.data.length).toBe(0);
  expect(result.pager).toMatchObject({ skip: 0, take: 20, total: 0 });
});

describe('fetchDataSet action', () => {
  describe('when fulfilled', () => {
    let state: PredictionExplanationsState = {
      data: [],
      pager: {
        skip: 0,
        take: 20,
        total: 0,
      },
      loadingData: false,
      loadingBreakdown: false,
      metadata: {
        columns: ['stuff', 'things'],
      },
      selectionState: {},
    };

    beforeEach(() => { state = applyFetchDataSetFulfilled(); });

    it('unsets the loading state', () => {
      expect(state.loadingData).toBe(false);
    });

    it('updates the data', () => {
      expect(state.data.length).toBe(1);
    });

    it('updates metadata', () => {
      expect(state.metadata).toMatchObject({ columns: ['stuff', 'things'] });
    });
  });
});

describe('fetchBreakdown action', () => {
  describe('when fulfilled', () => {
    let state: PredictionExplanationsState;

    beforeEach(() => { state = applyFetchBreakdownFulfilled(); });

    it('unsets the loading state', () => {
      expect(state.loadingBreakdown).toBe(false);
    });

    it('updates the breakdown', () => {
      expect(state.predictionBreakdown).toMatchObject({
        data: [],
        layout: {},
      });
    });
  });
});

describe('updatePredictionSelection', () => {
  it('updates the selection state', () => {
    const state = reducer(undefined, actions.updatePredictionSelection({
      test: true,
    }));

    expect(state.selectionState).toMatchObject({ test: true });
  });
});
