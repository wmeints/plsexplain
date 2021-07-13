import React from 'react';
import { Data, Layout } from 'plotly.js';
import Plot from './Plot';

interface PlotCardProps {
  data: Data | undefined
  layout: Layout | undefined
}

const PlotCard: React.FC<PlotCardProps> = (props: PlotCardProps) => {
  const { data, layout } = props;

  return (
    <div className="card">
      <div className="card-body">
        <Plot data={data} layout={layout} />
      </div>
    </div>
  );
};

export default PlotCard;
