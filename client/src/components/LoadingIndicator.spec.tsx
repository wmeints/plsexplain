import React from 'react';
import { shallow } from 'enzyme';
import LoadingIndicator from './LoadingIndicator';

test('renders correctly', () => {
  const component = shallow(<LoadingIndicator text="test" />);
  expect(component).toMatchSnapshot();
});
