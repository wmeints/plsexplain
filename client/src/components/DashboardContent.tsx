import React from 'react';
import ModelExplanationDashboard from './ModelExplanationDashboard';
import PredictionExplanationDashboard from './PredictionExplanationDashboard';

type DashboardContentSection = 'model' | 'prediction';

interface DashboardContentProps {
  section: DashboardContentSection
}

const DashboardContent = (props: DashboardContentProps) => {
  const { section } = props;

  if (section === 'model') {
    return <ModelExplanationDashboard />;
  }
  return <PredictionExplanationDashboard />;
};

export default DashboardContent;
