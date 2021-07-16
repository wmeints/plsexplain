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

  const auc = component.find('[data-test="auc"]');
  const precision = component.find('[data-test="precision"]');
  const recall = component.find('[data-test="recall"]');
  const accuracy = component.find('[data-test="accuracy"]');
  const f1 = component.find('[data-test="f1"]');

  expect(auc.text()).toBe('0.79');
  expect(precision.text()).toBe('0.66');
  expect(recall.text()).toBe('0.68');
  expect(accuracy.text()).toBe('0.82');
  expect(f1.text()).toBe('0.38');
});
