import React from 'react';
import { AppState } from '../store';
import './App.scss';
import DashboardContent from './DashboardContent';
import Navigation from './Navigation';

const App = () => (
  <div className="container">
    <Navigation section="model" />
    <DashboardContent section="model" />
  </div>
);

export default App;
