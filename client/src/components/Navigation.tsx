import React from 'react';

export type NavigationSection = 'model' | 'prediction';

interface NavigationProps {
  section: NavigationSection
  onSectionChanged?(section: string): void
}

const Navigation = (props: NavigationProps) => {
  const { section, onSectionChanged } = props;

  const onNavigateModelExplanations = () => onSectionChanged!('model');
  const onNavigatePredictionExplanations = () => onSectionChanged!('prediction');

  return (
    <ul className="nav nav-pills">
      <li className="nav-item">
        <button
          type="button"
          className={`nav-link ${section === 'model' ? 'active' : ''}`}
          onClick={onNavigateModelExplanations}
        >
          Model explanations
        </button>
      </li>
      <li className="nav-item">
        <button
          type="button"
          className={`nav-link ${section === 'prediction' ? 'active' : ''}`}
          onClick={onNavigatePredictionExplanations}
        >
          Prediction explanations
        </button>
      </li>
    </ul>
  );
};

Navigation.defaultProps = {
  onSectionChanged: () => {},
};

export default Navigation;
