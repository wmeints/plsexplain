import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../redux/store';
import * as actions from '../redux/actions';
import FeatureImportance from '../components/FeatureImportance';
import LoadingIndicator from '../components/LoadingIndicator';
import InteractivePlotCard from '../components/InteractivePlotCard';

const ModelDashboardPage = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { data, layout } = useSelector((state: State) => state.modelExplanations.featureImportance);
  const featureProfile = useSelector((state: State) => state.modelExplanations.featureProfile);
  const {
    loadingFeatureImportance,
    loadingFeatureProfile,
  } = useSelector((state: State) => state.modelExplanations);

  useEffect(() => {
    dispatch(actions.fetchFeatureImportance());
  }, []);

  const loadFeatureProfile = (feature: string) => {
    dispatch(actions.fetchFeatureProfile({ name: feature }));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="h4 mb-4 mt-4">Model explanations</h1>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {loadingFeatureImportance && <LoadingIndicator text="Loading data..." />}
          {!loadingFeatureImportance && (
            <FeatureImportance
              className="mb-3"
              data={data}
              layout={layout}
              onFeatureSelected={(feature) => loadFeatureProfile(feature)}
            />
          )}
          <h2 className="h4 mt-4 mb-4">
            Feature profile
          </h2>
          <InteractivePlotCard
            plot={featureProfile}
            loadingText="Loading feature profile..."
            missingDataText="Please select a feature from the feature importance plot to see its profile."
            loading={loadingFeatureProfile}
          />
        </div>
      </div>
    </div>
  );
};

export default ModelDashboardPage;
