import React from 'react';
import { render } from 'enzyme';
import RegressionPerformance from './RegressionPerformance';

test('renders correctly', () => {
  const data = {
    r2: 0.4,
    mse: 0.48,
    rmse: 0.25,
    mad: 0.01,
    mae: 0.48,
  };

  const component = render(<RegressionPerformance data={data} />);
  expect(component).toMatchSnapshot();
});
