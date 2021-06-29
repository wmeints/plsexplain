import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../redux/store';
import { ClassificationPerformanceState } from '../redux/metadata';
import ClassificationPerformance from '../components/ClassificationPerformance';
import * as actions from '../redux/actions';
import ModelType from '../components/ModelType';
import LoadingIndicator from '../components/LoadingIndicator';

const OverviewPage = (): React.ReactElement => {
  const metadataRef = useRef(0);
  const performanceRef = useRef(0);

  const {
    modelType,
    performance,
    performanceDataLoading,
    metadataLoading,
  } = useSelector((state: State) => state.metadata);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.fetchModelPerformance());
  }, [performanceRef]);

  useEffect(() => {
    dispatch(actions.fetchMetadata());
  }, [metadataRef]);

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
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
