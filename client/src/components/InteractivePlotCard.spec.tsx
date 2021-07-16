/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { render } from 'enzyme';
import InteractivePlotCard from './InteractivePlotCard';
import plotData from '../__samples__/feature-importance.json';

test('renders loading state correctly', () => {
  const wrapper = render(
    <InteractivePlotCard
      loading
      loadingText="Loading data"
      missingDataText=""
      plot={plotData as any}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

test('renders normal state correctly', () => {
  const wrapper = render(
    <InteractivePlotCard
      loading={false}
      loadingText="Loading data"
      missingDataText=""
      plot={plotData as any}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});

test('renders normal state correctly', () => {
  const wrapper = render(
    <InteractivePlotCard
      loading={false}
      loadingText="Loading data"
      missingDataText="This is missing text"
      plot={undefined}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
