import React from 'react';
import { shallow } from 'enzyme';
import FeatureImportance from './FeatureImportance';

test('renders correctly', () => {
  const layout = {
    title: 'test'
  };

  const data: any[] = [];

  const component = shallow(<FeatureImportance data={data} layout={layout} />);
  expect(component).toMatchSnapshot();
});
