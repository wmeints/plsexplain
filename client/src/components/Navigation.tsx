import React from 'react';

type NavigationSection = "model" | "prediction";

interface NavigationProps {
    section: NavigationSection
    onSectionChanged?(section: string): void
}

const Navigation = (props: NavigationProps) => {
    const onNavigateModelExplanations = () => props.onSectionChanged && props.onSectionChanged('model');
    const onNavigatePredictionExplanations = () => props.onSectionChanged && props.onSectionChanged('prediction');

    return (
        <ul className="nav nav-pills">
            <li className="nav-item">
                <a
                    href="#"
                    className={`nav-link ${props.section == 'model' ? 'active' : ''}`}
                    onClick={onNavigateModelExplanations}
                >Model explanations</a>
            </li>
            <li className="nav-item">
                <a
                    href="#"
                    className={`nav-link ${props.section == 'prediction' ? 'active' : ''}`}
                    onClick={onNavigatePredictionExplanations}
                >Prediction explanations</a>
            </li>
        </ul>
    );
};

export default Navigation;