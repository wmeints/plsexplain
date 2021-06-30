import React, { ReactElement } from 'react';
import Plotly from 'plotly.js-dist';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

interface FeatureProfileProps {
  data: any
  layout: any
}

const FeatureProfile = (props: FeatureProfileProps) : ReactElement => {
  const { data, layout } = props;

  // HACK: This really nasty trick makes data retrieved from the redux store
  // mutable so we can use it with plotly. This will be fixed in a future version of plotly :-)
  const graphData = JSON.parse(JSON.stringify(data));
  const graphLayout = JSON.parse(JSON.stringify(layout));

  return (
    <div className="card shadow-sm">
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

export default FeatureProfile;
