import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showModelExplanations, showPredictionExplanations } from '../redux/navigation';
import { State } from '../redux/store';

const NavigationBar = (): React.ReactElement => {
  const { currentSection } = useSelector((state: State) => state.navigation);
  const dispatch = useDispatch();

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <button
          className={`nav-link ${currentSection === 'model' && 'active'}`}
          type="button"
          onClick={() => dispatch(showModelExplanations())}
        >
          Model
        </button>
      </li>
      <li className="nav-item">
        <button
          type="button"
          className={`nav-link ${currentSection === 'prediction' && 'active'}`}
          onClick={() => dispatch(showPredictionExplanations())}
        >
          Predictions
        </button>
      </li>
    </ul>
  );
};

export default NavigationBar;
