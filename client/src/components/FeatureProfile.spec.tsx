import React from 'react';
import { shallow } from 'enzyme';
import FeatureProfile from './FeatureProfile';

test('renders correctly', () => {
  const layout = {
    title: 'test',
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data: any[] = [];

  const component = shallow(<FeatureProfile data={data} layout={layout} />);
  expect(component).toMatchSnapshot();
});
