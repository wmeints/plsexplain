import React, { ReactElement } from 'react';

interface LoadingIndicatorProps {
  text: string
}

const LoadingIndicator = (props: LoadingIndicatorProps): ReactElement => {
  const { text } = props;
  return (
    <>
      <div className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />
      <span>{text}</span>
    </>
  );
};

export default LoadingIndicator;
