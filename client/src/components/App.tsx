import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux/store';
import OverviewPage from '../pages/OverviewPage';
import ModelDashboardPage from '../pages/ModelDashboardPage';
import PredictionDashboardPage from '../pages/PredictionDashboardPage';
import NavigationBar from './NavigationBar';

const App = (): React.ReactElement => (
  <Router history={history}>
    <NavigationBar />
    <Switch>
      <Route exact path="/">
        <OverviewPage />
      </Route>
      <Route path="/model">
        <ModelDashboardPage />
      </Route>
      <Route path="/predictions">
        <PredictionDashboardPage />
      </Route>
    </Switch>
  </Router>
);

export default App;
