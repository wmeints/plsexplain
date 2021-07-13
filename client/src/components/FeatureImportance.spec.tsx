/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { mount, render } from 'enzyme';
import { Data } from 'plotly.js';
import FeatureImportance from './FeatureImportance';
import Plot from './Plot';
import sample from '../__samples__/feature-importance.json';

test('renders correctly', () => {
  const { data, layout } = sample;

  const component = render(
    <FeatureImportance
      data={data as Data}
      layout={layout as any}
    />,
  );
  expect(component).toMatchSnapshot();
});

test('handles feature selection', () => {
  const { data, layout } = sample;
  const selectionHandler = jest.fn();

  const component = mount(
    <FeatureImportance data={data as Data} layout={layout as any} onFeatureSelected={selectionHandler} />,
  );

  // eslint-disable-next-line no-unused-vars
  const clickHandler: ((arg: any) => void) | undefined = component.find(Plot).prop('onClick');

  clickHandler!({ points: [{ label: 'PAY_1' }] });

  expect(selectionHandler).toHaveBeenCalledWith('PAY_1');
});

test('forces handler to be non-null', () => {
  const { data, layout } = sample;
  const selectionHandler = jest.fn();

  const component = mount(
    <FeatureImportance data={data as Data} layout={layout as any} onFeatureSelected={undefined} />,
  );

  // eslint-disable-next-line no-unused-vars
  const clickHandler: ((arg: any) => void) | undefined = component.find(Plot).prop('onClick');

  clickHandler!({ points: [{ label: 'PAY_1' }] });

  expect(selectionHandler).not.toHaveBeenCalled();
});
