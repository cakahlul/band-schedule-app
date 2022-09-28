import React from 'react';

const AlertBoxError = props => {
  if (!props.isError) {
    return;
  }
  return (
    <div className="AlertBox AlertBox--danger MarginBottom">
      <div className="AlertBox-text">{props.errorMessage}</div>
      <button
        className="AlertBox-action"
        onClick={() => window.location.reload(false)}
      >
        Retry
      </button>
    </div>
  );
};

export default AlertBoxError;
