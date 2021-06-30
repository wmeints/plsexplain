import React, { ReactElement } from 'react';

interface RegressionPerformanceProps {
  data: {
    mse: number
    mae: number
    mad: number
    rmse: number
    r2: number
  }
}

const RegressionPerformance = (props: RegressionPerformanceProps): ReactElement => {
  const {
    data: {
      r2,
      mse,
      mae,
      rmse,
      mad,
    },
  } = props;

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="row">
          <div className="col">
            <div className="card-text"><abbr title="Mean Absolute Error">MAE</abbr></div>
            <p className="h3">{mae.toFixed(2)}</p>
          </div>
          <div className="col">
            <div className="card-text"><abbr title="Root Mean Square Error">RMSE</abbr></div>
            <p className="h3">{rmse.toFixed(2)}</p>
          </div>
          <div className="col">
            <div className="card-text"><abbr title="Mean Squared Error">MSE</abbr></div>
            <p className="h3">{mse.toFixed(2)}</p>
          </div>
          <div className="col">
            <div className="card-text"><abbr title="R squared correlation">r&sup2;</abbr></div>
            <p className="h3">{r2.toFixed(2)}</p>
          </div>
          <div className="col">
            <div className="card-text"><abbr title="Mean Absolute Deviation">MAD</abbr></div>
            <p className="h3">{mad.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegressionPerformance;
