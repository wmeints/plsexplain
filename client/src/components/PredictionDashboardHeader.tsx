import React, { ReactElement } from 'react';

const PredictionDashboardHeader = (): ReactElement => (
  <div className="prediction-dashboard-header shadow-sm pt-2 pb-2">
    <div className="container">
      <div className="row">
        <div className="col-auto">
          <button type="button" className="btn btn-link" aria-label="Previous sample">
            <i className="fas fa-chevron-left" />
          </button>
          <button type="button" className="btn btn-link" aria-label="Next sample">
            <i className="fas fa-chevron-right" />
          </button>
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <strong>Sample #1:</strong>
            </div>
          </div>
          <div className="row">
            <div className="col-3">
              <span className="text-muted mr-2">PAY_1</span>
              <span>Some value</span>
            </div>
            <div className="col-3">
              <span className="text-muted mr-2">PAY_1</span>
              <span>Some value</span>
            </div>
            <div className="col-3">
              <span className="text-muted mr-2">PAY_1</span>
              <span>Some value</span>
            </div>
            <div className="col-3">
              <span className="text-muted mr-2">PAY_1</span>
              <span>Some value</span>
            </div>
            <div className="col-3">
              <span className="text-muted mr-2">PAY_1</span>
              <span>Some value</span>
            </div>
            <div className="col-3">
              <span className="text-muted mr-2">PAY_1</span>
              <span>Some value</span>
            </div>
            <div className="col-3">
              <span className="text-muted mr-2">PAY_1</span>
              <span>Some value</span>
            </div>
            <div className="col-3">
              <span className="text-muted mr-2">PAY_1</span>
              <span>Some value</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PredictionDashboardHeader;
