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
            <div className="card-text">Precision</div>
            <p className="h3">{precision.toFixed(2)}</p>
          </div>
          <div className="col">
            <div className="card-text">Recall</div>
            <p className="h3">{recall.toFixed(2)}</p>
          </div>
          <div className="col">
            <div className="card-text">Accuracy</div>
            <p className="h3">{accuracy.toFixed(2)}</p>
          </div>
          <div className="col">
            <div className="card-text">F1-Score</div>
            <p className="h3">{f1.toFixed(2)}</p>
          </div>
          <div className="col">
            <div className="card-text">AUC</div>
            <p className="h3">{auc.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassificationPerformance;
