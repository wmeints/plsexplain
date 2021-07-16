import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import fetchMock from 'jest-fetch-mock';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ModelDashboardPage from './ModelDashboardPage';
import featureImportance from '../__samples__/feature-importance.json';

const mockStore = configureStore([
  thunk,
]);

beforeEach(() => {
  fetchMock.resetMocks();
});

test('renders correctly', () => {
  const store = mockStore({
    modelExplanations: {
      loadingFeatureImportance: true,
      featureImportance,
    },
  });

  const wrapper = mount(
    <Provider store={store}>
      <ModelDashboardPage />
    </Provider>,
  );
  expect(wrapper).toMatchSnapshot();
});

test('renders correctly with data loaded', () => {
  const store = mockStore({
    modelExplanations: {
      loadingFeatureImportance: false,
      featureImportance,
    },
  });

  const wrapper = mount(
    <Provider store={store}>
      <ModelDashboardPage />
    </Provider>,
  );

  expect(wrapper).toMatchSnapshot();
});
