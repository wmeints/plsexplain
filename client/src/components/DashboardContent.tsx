import React from 'react';
import ModelExplanationDashboard from './ModelExplanationDashboard';
import PredictionExplanationDashboard from './PredictionExplanationDashboard';

type DashboardContentSection = 'model' | 'prediction';

interface DashboardContentProps {
    section: DashboardContentSection
}

const DashboardContent = (props: DashboardContentProps) => {
    if(props.section === 'model') {
        return <ModelExplanationDashboard/>;
    } else {
        return <PredictionExplanationDashboard/>;
    }
};

export default DashboardContent;