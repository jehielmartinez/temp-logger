import React from 'react';

const Error = props => {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="alert alert-warning">{props.error}</div>
        </div>
      </div>
    );
  };

export default Error;