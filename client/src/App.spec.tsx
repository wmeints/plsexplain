import React from 'react';
import renderer from 'react-test-renderer';
import App from './App';

test('Renders succesfully', () => {
  const component = renderer.create(<App />);
  const tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});
