import React from 'react';
import { Data, Layout } from 'plotly.js';
import Plot from './Plot';

// eslint-disable-next-line no-unused-vars
type OnFeatureSelected = (name: string) => void;

interface FeatureImportanceProps {
  data: Data | undefined
  layout: Layout | undefined
  onFeatureSelected?: OnFeatureSelected
}

type FeatureImportanceComponent = React.FC<
  FeatureImportanceProps & React.HTMLAttributes<HTMLDivElement>>;

const FeatureImportance: FeatureImportanceComponent = ({
  data,
  layout,
  className,
  onFeatureSelected = undefined,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          data={data}
          layout={layout}
          onClick={(evt) => selectFeature(evt)}
        />
      </div>
    </div>
  );
};

export default FeatureImportance;
