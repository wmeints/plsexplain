import React, { ReactElement } from 'react';

interface ClassificationPerformanceProps {
  data: {
    precision: number
    recall: number
    accuracy: number
    f1: number
    auc: number
  }
}

const ClassificationPerformance = (props: ClassificationPerformanceProps): ReactElement => {
  const {
    data: {
      precision,
      recall,
      accuracy,
      f1,
      auc,
    },
  } = props;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <div className="card-text"><abbr title="Precision">Precision</abbr></div>
            <p className="h3" data-test="precision">{precision.toFixed(2)}</p>
          </div>
          <div className="col">
            <div className="card-text"><abbr title="Recall">Recall</abbr></div>
            <p className="h3" data-test="recall">{recall.toFixed(2)}</p>
          </div>
          <div className="col">
            <div className="card-text"><abbr title="Accuracy">Accuracy</abbr></div>
            <p className="h3" data-test="accuracy">{accuracy.toFixed(2)}</p>
          </div>
          <div className="col">
            <div className="card-text"><abbr title="F1-Score">F1-Score</abbr></div>
            <p className="h3" data-test="f1">{f1.toFixed(2)}</p>
          </div>
          <div className="col">
            <div className="card-text"><abbr title="Area Under The Curve">AUC</abbr></div>
            <p className="h3" data-test="auc">{auc.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassificationPerformance;
