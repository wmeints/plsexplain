import React, { FC } from 'react';
import { Data, Layout } from 'plotly.js';
import PlotCard from './PlotCard';
import LoadingIndicator from './LoadingIndicator';

interface InteractivePlotCardProps {
  plot?: {
    data?: Data | undefined
    layout?: Layout | undefined
  }
  loading: boolean
  loadingText: string
  missingDataText: string
}

const InteractivePlotCard: FC<InteractivePlotCardProps> = (props) => {
  const {
    plot,
    loading,
    loadingText,
    missingDataText,
  } = props;

  return (
    <>
      {loading && <LoadingIndicator text={loadingText} />}
      {!loading && !plot && <p className="text-muted">{missingDataText}</p>}
      {!loading && plot && (
        <>
          <PlotCard data={plot?.data} layout={plot?.layout} />
        </>
      )}
    </>
  );
};

export default InteractivePlotCard;
