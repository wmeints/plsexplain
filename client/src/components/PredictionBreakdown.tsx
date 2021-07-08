import { Data, Layout } from 'plotly.js';
import React from 'react';
import Plotly from 'plotly.js-dist';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

interface PredictionBreakdownProps {
  data: Data
  layout: Layout
}

type PredictionBreakdownComponent = React.FC<
  PredictionBreakdownProps & React.HTMLAttributes<HTMLDivElement>>;

const PredictionBreakdown: PredictionBreakdownComponent = (props) => {
  const { data, layout, className } = props;

  // HACK: This really nasty trick makes data retrieved from the redux store
  // mutable so we can use it with plotly. This will be fixed in a future version of plotly :-)
  const graphData = JSON.parse(JSON.stringify(data));
  const graphLayout = JSON.parse(JSON.stringify(layout));

  return (
    <div className={`card shadow-sm ${className}`}>
      <div className="card-body">
        <Plot
          data={graphData}
          layout={graphLayout}
          useResizeHandler
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
};

export default PredictionBreakdown;
