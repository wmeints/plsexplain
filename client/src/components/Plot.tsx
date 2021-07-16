import React, { FC } from 'react';
import { Data, Layout, PlotMouseEvent } from 'plotly.js';
import Plotly from 'plotly.js-dist';
import createPlotlyComponent from 'react-plotly.js/factory';

const PlotlyPlot = createPlotlyComponent(Plotly);

interface PlotCardProps {
  data: Data | undefined
  layout: Layout | undefined
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: Readonly<PlotMouseEvent>) => void
}

const Plot: FC<PlotCardProps> = ({ data, layout, onClick = undefined }) => {
  // HACK: This really nasty trick makes data retrieved from the redux store
  // mutable so we can use it with plotly. This will be fixed in a future version of plotly :-)
  const graphData = JSON.parse(JSON.stringify(data));
  const graphLayout = JSON.parse(JSON.stringify(layout));

  return (
    <PlotlyPlot useResizeHandler data={graphData} layout={graphLayout} onClick={onClick} />
  );
};

export default Plot;
