import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from './NavigationBar';

test('renders correctly', () => {
  const component = mount(
    <Router>
      <NavigationBar />
    </Router>,
  );
  expect(component).toMatchSnapshot();
});
