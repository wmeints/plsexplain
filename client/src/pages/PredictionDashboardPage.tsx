import React, { ReactElement, useEffect, useState } from 'react';
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

interface GridSelectionState {
  [ key: string]: boolean | number []
}

const PredictionDashboardPage = (): ReactElement => {
  const {
    data,
    pager,
    loadingData,
    metadata,
  } = useSelector((state: State) => state.predictionExplanations);

  const dispatch = useDispatch();

  const [selectionState, setSelectionState] = useState<GridSelectionState>({});

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

    setSelectionState(newSelectedState);
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
                data={data.map((item, index) => ({
                  ...item,
                  key: index,
                  selected: selectionState[index],
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
      )}
      <div className="container mt-4">
        <div className="row">
          <div className="col">
            <h1 className="mt-4 mb-4 h4">Prediction breakdown</h1>
          </div>
          <div className="col">
            <h1 className="mt-4 mb-4 h4">Feature profile</h1>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card shadow-sm">
              <div className="card-body">TODO: Chart</div>
            </div>
          </div>
          <div className="col">
            <div className="card shadow-sm">
              <div className="card-body">TODO: Chart</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PredictionDashboardPage;
