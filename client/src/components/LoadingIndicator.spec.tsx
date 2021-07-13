import React from 'react';
import { render } from 'enzyme';
import LoadingIndicator from './LoadingIndicator';

test('renders correctly', () => {
  const component = render(<LoadingIndicator text="test" />);
  expect(component).toMatchSnapshot();
});
