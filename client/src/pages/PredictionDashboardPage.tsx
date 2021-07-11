/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, ReactElement, useEffect } from 'react';
import './PredictionDashboard.scss';
import {
  Grid,
  GridColumn,
  GridPageChangeEvent,
  GridSelectionChangeEvent,
  getSelectedState,
} from '@progress/kendo-react-grid';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../redux/store';
import LoadingIndicator from '../components/LoadingIndicator';
import * as actions from '../redux/actions';
import '@progress/kendo-theme-bootstrap/scss/grid/_index.scss';
import InteractivePlotCard from '../components/InteractivePlotCard';
import Plot from '../components/Plot';

const PredictionDashboardPage = (): ReactElement => {
  const {
    data,
    pager,
    loadingData,
    loadingBreakdown,
    loadingFeatureProfile,
    predictionBreakdown,
    featureProfile,
    metadata,
    selectionState,
    featureSelection,
  } = useSelector((state: State) => state.predictionExplanations);

  const dispatch = useDispatch();

  const updatePage = (evt: GridPageChangeEvent) => {
    dispatch(actions.fetchDataSet({
      skip: evt.page.skip,
      take: evt.page.take,
    }));
  };

  const updateSelection = (evt: GridSelectionChangeEvent) => {
    const newSelectedState = getSelectedState({
      event: evt,
      selectedState: selectionState,
      dataItemKey: 'key',
    });

    const itemIndex = evt.dataItems[evt.startRowIndex].key;

    dispatch(actions.updatePredictionSelection(newSelectedState));
    dispatch(actions.fetchPredictionBreakdown({ index: itemIndex }));

    dispatch(actions.updateFeatureSelection({
      index: itemIndex,
      feature: metadata.columns[0],
    }));

    dispatch(actions.fetchPredictionFeatureProfile({
      index: itemIndex,
      feature: metadata.columns[0],
    }));
  };

  const updateFeatureSelection = (evt: ChangeEvent<HTMLSelectElement>) => {
    const featureName = evt.target.value;
    dispatch(actions.updateFeatureSelection({
      feature: featureName,
      index: featureSelection?.index,
    }));

    if (featureSelection?.index && featureName) {
      dispatch(actions.fetchPredictionFeatureProfile({
        index: featureSelection.index,
        feature: featureName,
      }));
    }
  };

  useEffect(() => {
    dispatch(actions.fetchDataSet({ skip: 0, take: 20 }));
  }, []);

  return (
    <>
      {loadingData && (
        <div className="container">
          <div className="row">
            <div className="col">
              <LoadingIndicator text="Loading data..." />
            </div>
          </div>
        </div>
      )}
      {!loadingData && (
        <>
          <div className="container">
            <div className="row">
              <div className="col">
                <h1 className="h4 mb-4">Predictions</h1>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Grid
                  style={{ height: '300px' }}
                  data={data.map((item) => ({
                    ...item,
                    selected: selectionState[item.key],
                  }))}
                  pageable
                  total={pager.total}
                  take={pager.take}
                  skip={pager.skip}
                  onPageChange={updatePage}
                  onSelectionChange={updateSelection}
                  selectable={{
                    mode: 'single',
                    cell: false,
                    enabled: true,
                    drag: false,
                  }}
                  dataItemKey="key"
                  selectedField="selected"
                  resizable
                >
                  {metadata.columns.map((column) => <GridColumn key={column} width="120px" field={column} title={column} />)}
                </Grid>
              </div>
            </div>
          </div>
          <div className="container mt-4">
            <div className="row">
              <div className="col">
                <h2 className="mt-4 mb-4 h5">Prediction breakdown</h2>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InteractivePlotCard
                  plot={predictionBreakdown}
                  loading={loadingBreakdown}
                  loadingText="Breaking down the selected prediction"
                  missingDataText="Please select a prediction to see its breakdown."
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h2 className="mt-4 mb-4 h5">Feature profile</h2>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <div className="form-inline">
                      <label htmlFor="selectedFeature" className="mr-2">Feature</label>
                      <select
                        id="selectedFeature"
                        name="selectedFeature"
                        className="form-control"
                        onChange={updateFeatureSelection}
                        value={featureSelection?.feature}
                      >
                        {metadata.columns.map((column) => (
                          <option key={column} value={column}>
                            {column}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="card-body">
                    {loadingFeatureProfile && (
                      <LoadingIndicator text="Loading feature profile..." />
                    )}
                    {!loadingFeatureProfile && featureProfile && (
                      <Plot data={featureProfile.data} layout={featureProfile.layout} />
                    )}
                    {!loadingFeatureProfile && !featureProfile && (
                      <p className="text-muted">
                        Please select a prediction to load its feature profile.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PredictionDashboardPage;
