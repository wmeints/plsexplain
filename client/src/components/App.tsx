import React from 'react';
import { AppState } from '../store';
import './App.scss';
import DashboardContent from './DashboardContent';
import NavigationContainer from '../containers/NavigationContainer';

const App = () => (
  <div className="container">
    <NavigationContainer/>
    <DashboardContent section="model" />
  </div>
);

export default App;
