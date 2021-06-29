import navigationReducer, { showModelExplanations, showPredictionExplanations } from './navigation';

test('showModelExplanations', () => {
  const result = navigationReducer({ currentSection: 'prediction' }, showModelExplanations());
  expect(result.currentSection).toBe('model');
});

test('showPredictionExplanations', () => {
  const result = navigationReducer({ currentSection: 'model' }, showPredictionExplanations());
  expect(result.currentSection).toBe('prediction');
});
