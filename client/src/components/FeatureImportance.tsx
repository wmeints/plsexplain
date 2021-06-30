import React from 'react';
import Plotly from 'plotly.js-dist';
import createPlotlyComponent from 'react-plotly.js/factory';

const Plot = createPlotlyComponent(Plotly);

// eslint-disable-next-line no-unused-vars
type OnFeatureSelected = (name: string) => void;

interface FeatureImportanceProps {
  data: any
  layout: any
  onFeatureSelected?: OnFeatureSelected
}

type FeatureImportanceComponent = React.FC<
  FeatureImportanceProps & React.HTMLAttributes<HTMLDivElement>>;

const FeatureImportance: FeatureImportanceComponent = (props) => {
  const {
    data,
    layout,
    onFeatureSelected,
    className,
  } = props;

  // HACK: This really nasty trick makes data retrieved from the redux store
  // mutable so we can use it with plotly. This will be fixed in a future version of plotly :-)
  const graphData = JSON.parse(JSON.stringify(data));
  const graphLayout = JSON.parse(JSON.stringify(layout));

  const selectFeature = (evt: any) => {
    const dataLabel = evt.points[0].label;
    if (onFeatureSelected) {
      onFeatureSelected(dataLabel);
    }
  };

  return (
    <div className={`card shadow-sm ${className}`}>
      <div className="card-body">
        <Plot
          data={graphData}
          layout={graphLayout}
          useResizeHandler
          style={{ width: '100%' }}
          onClick={(evt) => selectFeature(evt)}
        />
      </div>
    </div>
  );
};

FeatureImportance.defaultProps = {
  onFeatureSelected: undefined,
};

export default FeatureImportance;
