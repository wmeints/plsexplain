import { fetchMetadata, switchSection } from './actions';

test('fetchMetadata', () => {
  const result = fetchMetadata();
  expect(result).not.toBeNull();
});

test('fetchMetadata/fulfilled', () => {
  const result = fetchMetadata.fulfilled;
  expect(result).not.toBeNull();
});

test('fetchMetadata/rejected', () => {
  const result = fetchMetadata.rejected;
  expect(result).not.toBeNull();
});

test('switchSection', () => {
  const result = switchSection({ section: 'prediction' });
  expect(result.payload.section).toBe('prediction');
});
