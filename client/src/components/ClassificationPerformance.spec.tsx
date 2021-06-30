import React from 'react';
import { shallow } from 'enzyme';
import ClassificationPerformance from './ClassificationPerformance';

test('renders correctly', () => {
  const data = {
    auc: 0.79,
    precision: 0.66,
    recall: 0.68,
    accuracy: 0.82,
    f1: 0.38,
  };

  const component = shallow(<ClassificationPerformance data={data} />);
  expect(component).toMatchSnapshot();
});
