import React, { ReactElement } from 'react';

interface ModelTypeProps {
  type: string
}

const ModelType = (props: ModelTypeProps): ReactElement => {
  const { type } = props;
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="card-text">Model type</div>
        <p className="h3">{type}</p>
      </div>
    </div>
  );
};

export default ModelType;
