import reducer, { PredictionExplanationsState } from './predictionExplanations';

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
    },
  };

  const result = reducer(undefined, action);
  return result;
}

function createInitialState() {
  const state = reducer(undefined, { type: '' });
  return state;
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
    };

    beforeEach(() => { state = applyFetchDataSetFulfilled(); });

    it('unsets the loading state', () => {
      expect(state.loadingData).toBe(false);
    });

    it('updates the data', () => {
      expect(state.data.length).toBe(1);
    });
  });
});
