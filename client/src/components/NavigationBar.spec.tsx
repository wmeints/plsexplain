import React from 'react';
import { shallow } from 'enzyme';
import NavigationBar from './NavigationBar';

test('renders correctly', () => {
  const component = shallow(<NavigationBar />);
  expect(component).toMatchSnapshot();
});
