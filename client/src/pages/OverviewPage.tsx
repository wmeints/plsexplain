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
  } = useSelector((state: State) => state.metadata);

  const isLoading = useSelector((state: State) => state.metadata.metadataLoading
    || state.metadata.performanceDataLoading);

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
          <h1 className="mt-4 mb-4 h4">Overview</h1>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          {isLoading && <LoadingIndicator text="Loading data..." />}
          {!isLoading && <ModelType type={modelType} />}
        </div>
      </div>
      <div className="row">
        <div className="col">
          {modelType === 'classification' && !isLoading && (
            <ClassificationPerformance data={performance as ClassificationPerformanceState} />
          )}
          {modelType === 'regression' && !isLoading && (
            <RegressionPerformance data={performance as RegressionPerformanceState} />
          )}
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
