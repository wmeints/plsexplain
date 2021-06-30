import React from 'react';
import { shallow } from 'enzyme';
import ModelType from './ModelType';

test('renders correctly', () => {
  const component = shallow(<ModelType type="classification" />);
  expect(component).toMatchSnapshot();
  expect(component.contains('classification')).toBeTruthy();
});
