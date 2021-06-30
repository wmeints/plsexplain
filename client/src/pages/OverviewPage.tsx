import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../redux/store';
import { ClassificationPerformanceState, RegressionPerformanceState } from '../redux/metadata';
import ClassificationPerformance from '../components/ClassificationPerformance';
import * as actions from '../redux/actions';
import ModelType from '../components/ModelType';
import LoadingIndicator from '../components/LoadingIndicator';
import RegressionPerformance from '../components/RegressionPerformance';

const OverviewPage = (): React.ReactElement => {
  const {
    modelType,
    performance,
    performanceDataLoading,
    metadataLoading,
  } = useSelector((state: State) => state.metadata);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchModelPerformance());
  }, []);

  useEffect(() => {
    dispatch(actions.fetchMetadata());
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h4 className="mt-4 mb-4 page-title">Overview</h4>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          {metadataLoading && <LoadingIndicator text="Loading metadata..." />}
          {!metadataLoading && <ModelType type={modelType} />}
        </div>
      </div>
      <div className="row">
        <div className="col">
          {performanceDataLoading && <LoadingIndicator text="Loading model performance data..." />}
          {modelType === 'classification' && !performanceDataLoading && <ClassificationPerformance data={performance as ClassificationPerformanceState} />}
          {modelType === 'regression' && !performanceDataLoading && <RegressionPerformance data={performance as RegressionPerformanceState} />}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
