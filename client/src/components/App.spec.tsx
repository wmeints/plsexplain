import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

test('Renders correctly', () => {
  const component = shallow(<App />);
  expect(component).toMatchSnapshot();
});
