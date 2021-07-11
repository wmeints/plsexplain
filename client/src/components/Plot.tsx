import React, { FC } from 'react';
import { Data, Layout } from 'plotly.js';
import Plotly from 'plotly.js-dist';
import createPlotlyComponent from 'react-plotly.js/factory';

const PlotlyPlot = createPlotlyComponent(Plotly);

interface PlotCardProps {
  data: Data | undefined
  layout: Layout | undefined
}

const Plot: FC<PlotCardProps> = (props: PlotCardProps) => {
  const { data, layout } = props;

  // HACK: This really nasty trick makes data retrieved from the redux store
  // mutable so we can use it with plotly. This will be fixed in a future version of plotly :-)
  const graphData = JSON.parse(JSON.stringify(data));
  const graphLayout = JSON.parse(JSON.stringify(layout));

  return (
    <PlotlyPlot useResizeHandler data={graphData} layout={graphLayout} />
  );
};

export default Plot;
